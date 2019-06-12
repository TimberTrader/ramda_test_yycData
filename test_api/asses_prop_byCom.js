const request = require('request');

// https://data.calgary.ca/resource/g5k5-gjns.json?community=GLENDALE&commodity=Green&$Limit=
// function print(data) {
//   console.log(data);
//   console.log(data.length)
// }

// function groupBy(data, property, transformer) {
//   const out = {}
//   if (!property) return out;
//   return data.reduce((group, obj) => {
//     const thisProp = obj[property]
//     const curr = group[thisProp] || [];
//     if (typeof transformer == 'function') obj = transformer(obj)
//     curr.push(obj);
//     group[thisProp] = curr;
//     return group;
//   }, out)
// }
const resourceIDMap = {
  prop_assess_val: 'qzk3-5xur'
}

function apiCall(resourceID, callBack) {
    let options = {
      url: `https://data.calgary.ca/resource/${resourceIDMap[resourceID]}.json`,
      headers: {
        'User-Agent': 'request',
        'X-App-Token': 'TuumEdQ9KIehmtGnn2QjJoes7'
      }
    };
    request(options, function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      let dataObj = JSON.parse(body);
      callBack(dataObj);
    });
  }

  function createSortedDataByYear(data) {
    const lastYear = data.reduce((groupedByYear, obj) => {
      const year = (new Date(obj.date)).getFullYear();
      if (!groupedByYear[year]) groupedByYear[year] = [];
      groupedByYear[year].push(obj);
      groupedByYear[year].sort((a, b) => Number(b.median_assessed_value) - Number(a.median_assessed_value));
      return groupedByYear;
    }, {})['2017'];
    return lastYear
  }

  function createTargetData(lastYear, community) {
    const myComIndex = lastYear.findIndex(obj => obj.comm_code === community);
    const minIndex = myComIndex - 3 < 0 ? 0 : myComIndex - 3;
    const maxIndex = myComIndex + 4 > lastYear.length - 1 ? lastYear.length : myComIndex + 4;
    const targetRange = lastYear.slice(minIndex, maxIndex);
    return {
      range: targetRange,
      targetIndex: myComIndex,
      lastAvailableYear: '2017',
      highestValue: lastYear[0].median_assessed_value,
      lowestValue: lastYear[lastYear.length - 1].median_assessed_value
    }
  }
  
  function createOutput(community, resourceID, darrenCb) {
    apiCall(resourceID, function (data) {
      massagedData = createSortedDataByYear(data);
      finalOut = createTargetData(massagedData, community);
      darrenCb(finalOut)
    })
  }
    // const output = {
    // numCommunitiesRanked: lastYear.length,
    // myCommunityRank: myComIndex,
    // hiMedianValue: lastYear.find( elem => elem == lastYear[0]),
    // targetRange: targetRange,
    // loMedianValue: lastYear.find(elem => elem == lastYear[lastYear.length - 1])
    // };
  
  

// apiCall('prop_assess_val', createSortedDataByYear)
createOutput("BNK", "prop_assess_val", console.log)
