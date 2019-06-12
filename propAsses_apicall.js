const request = require('request');

const resourceIDMap = {
  prop_assess_val: '6zp6-pxei'
}

function apiCall(resourceID, callBack) {
  let options = {
    url: `https://data.calgary.ca/resource/${resourceIDMap[resourceID]}.json&$Limit=50000`,
    headers: {
      'User-Agent': 'request',
      'X-App-Token': 'TuumEdQ9KIehmtGnn2QjJoes7'
    }
  };
  request(options, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    let dataObj = JSON.parse(body);
    console.log(dataObj);
    console.log(dataObj.length)
  });
}

apiCall('prop_assess_val')

// function createOutput(resourceID, callback) {
//   apiCall(resourceID, function (data) {
//     callback()
//   })
// }

// createOutput('prop_assess_val', console.log)
