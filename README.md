# newsie-news-bot
Example of using Microsoft Bot Framework to create a working bot. Powered by [News API Beta](https://beta.newsapi.org). You can setup your news preferences, get the top headlines or search for a specific subject.

In order to run this bot you will need to do the following:

1. Register your bot with the Microsoft Bot Framework. If you are looking for instructions on how to register your bot

2. Get a News API key, you can sign up for one [here](https://beta.newsapi.org)

3. Have NodeJS installed

dependencies:
NodeJS
BotBuilderSDK

##Running the Bot
Setting up the environment variables with a .env file. Create a .env file in the root directory of your project

````
NEWS_BOT_APP_ID=<MS Bot App ID>
NEWS_BOT_APP_SECRET=<MS Bot App Password>
NEWS_API_KEY=<newsapi.org API key>
PORT=<Port Number>
````
or

````
NEWS_BOT_APP_ID=<NEWS_BOT_APP_ID> NEWS_BOT_APP_PASSWORD=<NEWS_BOT_APP_PASSWORD> PORT=3000 npm run start
````
