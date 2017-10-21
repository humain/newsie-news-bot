const newsApiKey = process.env.NEWS_API_KEY
const newsApiUrl = 'https://beta.newsapi.org/v2'
const request = require('request')
const _ = require('lodash')

function getTopHeadLines(callback){
  const options = {
    METHOD: 'GET',
    headers:{
      'X-Api-Key': newsApiKey
    },
    json: true,
    qs: {
      language: 'en',
      country: 'us',
    },
    url: `${newsApiUrl}/top-headlines`
  }
   request(options, function(error, response, body){
       if(error) return callback(error)
       const articles = _.get(body, 'articles', [])
       callback(null, articles)
  })
}

module.exports.getTopHeadLines = getTopHeadLines
