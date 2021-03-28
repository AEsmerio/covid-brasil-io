
const axios = require("axios")

async function getData (qryString) {
  const url = `https://api.brasil.io/v1/dataset/covid19/caso/data/?${qryString}`
  const response = await axios.get(url, {
    headers: {Authorization: `token ${process.env.myToken}`}
  })
  return response.data.results
}

exports.getData = getData

async function getTopCities(qryString, top) {
  let results = await getData(qryString)
  //remove the Null city
  results = results.filter(result => result.city)
  const resultsSorted = results.sort((a, b) => (a.confirmed < b.confirmed) ? 1 : -1)
  top = Math.min(top, resultsSorted.length)
  const resultsTopX = resultsSorted.slice(0, top - 1)
  const result = resultsTopX.map(result => { return {city: result.city, confirmed: result.confirmed}})
  return result
}

exports.getTopCities = getTopCities
