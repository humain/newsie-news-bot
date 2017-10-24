const _ = require('lodash')
const pluralize = require('pluralize')
const debug = require('debug')('newsie-news-bot:set-preferences-dialog')

const SET_PREFERENCES_INTRO = `
Let\'s customize your news preferences.\n
You can set your news topics to further curate the news you receive.\n
You can cancel anytime by typing 'CANCEL'.\n
`
const setPreferences = [
function(session){
  debug('Begin set preferences')
  session.send(SET_PREFERENCES_INTRO)
  session.beginDialog('topics')
},
function(session, results){
  const topics = _.get(session, 'userData.topics', [])
  const message = `
    You have selected ${topics.length} ${pluralize('topic', topics.length)}\n
    Your current topics are:\n
    ${topics.toString()}
  `
  session.send(message)
  session.endDialog()
}]


module.exports = setPreferences
