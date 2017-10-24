const {ChatConnector, UniversalBot, Prompts } = require('botbuilder');
const _  = require('lodash');
const debug = require('debug')('hello-world-bot:router')
const topHeadlines = require('./dialogs/topHeadlines')

console.log('Top headlines', topHeadlines)
class Router {
  constructor({ appId, appSecret, newsApiKey }) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.route = this.route.bind(this);
  }

  route(app) {
    const connector = new ChatConnector({
      appId: this.appId,
      appPassword: this.appSecret
    })

    app.post('/api/messages', connector.listen())

    // Main menu
    const menuItems = {
      'Top Head Lines': {
        item: 'topHeadlines'
      },
      'Set your preferences': {
        item: 'setPreferences'
      }
    }
    const bot = new UniversalBot(connector, [
        function(session){
          session.send('Welcome to Newsie the News Bot powered by the newsapi.org')
          session.beginDialog('mainMenu')
        }
    ]);
    // Display the main menu and start a new request depending on user input.
    bot.dialog("mainMenu", [
        function(session){
            Prompts.choice(session, "Here are your options:", menuItems);
        },
        function(session, results){
            if(results.response){
                session.beginDialog(menuItems[results.response.entity].item);
            }
        }
    ])
    .triggerAction({
        // The user can request this at any time.
        // Once triggered, it clears the stack and prompts the main menu again.
        matches: /^main menu$/i,
        confirmPrompt: "This will cancel your request. Are you sure?"
    });
    bot.dialog('topHeadlines', topHeadlines).triggerAction({
      matches: /^top headlines$/i,
      confirmPrompt: 'This will cancel your request. Are you sure?'
    });
    // log any bot errors into the console
    bot.on('error', function (e) {
        console.log('And error ocurred', e);
    });
  }
}
module.exports = Router
