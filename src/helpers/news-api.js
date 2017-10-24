const newsApiKey = process.env.NEWS_API_KEY
const newsApiUrl = 'http://beta.newsapi.org/v2'
const request = require('request')
const _ = require('lodash')



function getSources({language='en', categories=[]}, callback){

}

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
    baseUrl: newsApiUrl,
    url: `/top-headlines`
  }
   request(options, function(error, response, body){
     console.log(error, body.articles)
     if(error) return callback(error)
     if (_.isEmpty(body)) return callback(new Error("Empty body"))

     const { articles } = body
     callback(null, articles)
  })
}

module.exports.getSources = getSources
module.exports.getTopHeadLines = getTopHeadLines
