const express = require('express')
const coronaApi = require("./corona")
const port = 3000
let app = express()


app.get('/', (_req, res) => {
  res.send('Im ready!!')
})
app.get('/corona', async (req, res) => {
  const qryString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&'); 
  const results = await coronaApi.getTopCities(qryString, 20)
  res.send(results)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// setup your Token on "process.env.myToken". A token can be taken on "https://brasil.io/auth/tokens-api/"
// to run use "node app.js"