const express = require('express');
const request = require('request');
// const app = express();
// const port = 3000;

// get me all addresses where community is ....
function getSomethingBy(data, property, value) {
  return data.reduce((addresses, obj) => {
    const address = obj[property] === value && obj.address
    address && addresses.push(address)
    return addresses;
  }, []);
}

// 
function groupBy(data, property) {
  const out = {}
  if (!property) return out;
  return data.reduce((group, obj) => {
    const thisProp = obj[property]
    const curr = group[thisProp] || [];
    curr.push(obj);
    group[thisProp] = curr;
    return group;
  }, out)
}

function requestYYC() {
  request('https://data.calgary.ca/resource/g5k5-gjns.json', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    let ourData = JSON.parse(body)
    console.log(
      "getSomething",
      getSomethingBy(ourData, 'OGDEN')
    );
    // console.log(
    //   "groupBy:",
    //   groupBy(ourData, 'collection_day')
    // );
  })
}

console.log(requestYYC())

/* SAMPLE CODE - change shape and look up object
    function findFriend(data, name, field) {
      var newData = data.reduce((obj, item) => {
        obj[item[name]] = item;
        return obj;
      }, {});
      if (newData[name] && newData[name][field]) {
        var lookUp = newData[name].friends[0];
        return {name: newData[lookUp].name, [field]: newData[lookUp][field]};
      } else {
        return "Not found";
      }
    }
*/

/* FOR USE when using REQUEST.ON
app.listen(port, () => console.log(`Example app listening on port ${port}!`))*/

/* SAMPLE CODE - use filter
    var newData = ourData.filter((obj, comm  ) => {
     return (obj.community === "ROCKY RIDGE")
    })
    console.log(newData)
*/


/* SAMPLE CODE - iterate through array

  newData.forEach(function(elem) {
      console.log(elem)
    });
*/