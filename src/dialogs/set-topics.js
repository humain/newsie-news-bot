/*
   Set Topics sets the news categories for the reader
   Categories are presented as a list and the user can select multiple categories
   if they are done they can end the dialog by typing 'done' or 'stop'
*/
const _ = require('lodash')
const { Prompts, ListStyle } = require('botbuilder')


const categories = {
  "Business": {
    item: 'business'
  },
  "Entertainment":{
    item: "entertainment"
  },
  "Gaming":{
    item: "gaming"
  },
  "General": {
    item: "general"
  },
  "Music": {
    item: "music"
  },
  "Science and Nature": {
    item: "science-and-nature"
  },
  "Sport": {
    item: "sport"
  },
  "Technology": {
    item: "technology"
  }
}

const setTopics = [
  function(session, args){
    const reprompt = _.get(args, 'reprompt', false)

    Prompts
    .choice(
      session,
      'Please choose a topic',
      categories,
      {retryPrompt: "Sorry that isn\'t a valid choice"}
    )
},
  function(session, results){
    const category = categories[results.response.entity]
    const newsTopics = _.get(session, 'userData.newsie.topics', [])
    if(_.indexOf(newsTopics, category.item) >= 0){
      Prompts.text(session, `You have already chosen ${category}. Would you like to choose another topic?`)
    } else{
      newsTopics.push[category.item]
      session.userData.topics = newsTopics
    }
    Prompts.choice(
      session,
      'Would you like to choose another topic?',
      'YES|NO',
      {
        listStyle: ListStyle.button,
        retryPrompt: 'Sorry that isn\'t a valid choice',
        maxRetries: 2
      }
    )
  },
  function(session, results){
    const response = results.response.entity
    if(response === 'NO') {
        session.endDialog()
    } else  {
      session.replaceDialog('setTopics', {reprompt: true})
    }
  }
]


module.exports = setTopics
