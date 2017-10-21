const _ = require('lodash');
const SigtermHandler = require('sigterm-handler');
const Server = require('./server');

class Command {
  constructor() {
    this.panic = this.panic.bind(this);
    this.run = this.run.bind(this);
    this.serverOptions = {
      port:           process.env.PORT || 3000,
      appId:          process.env.NEWS_BOT_APP_ID,
      appSecret:      process.env.NEWS_BOT_APP_SECRET,
      newsApiKey:     process.env.NEWS_API_KEY,
      disableLogging: process.env.DISABLE_LOGGING === "true"
    };
  }

  panic(error) {
    console.error(error.stack);
    return process.exit(1);
  }

  run() {
    // Use this to require env
    console.log('Server options: ', this.serverOptions)
    if(_.isEmpty(this.serverOptions.appId))
      return this.panic(new Error('Missing required environment variable: NEWS_BOT_APP_ID'))

    if(_.isEmpty(this.serverOptions.appSecret))
      return this.panic(new Error('Missing required environment variable: NEWS_BOT_APP_SECRET'))

    if(_.isEmpty(this.serverOptions.newsApiKey))
      return this.panic(new Error('Missing required environment variable: NEWS_API_KEY'))

    let server = new Server(this.serverOptions);
    server.run(error => {
      if (error != null) { return this.panic(error); }

      let {address,port} = server.address();
      return console.log(`Newsie News Bot listening on port: ${port}`);
    }
    );

    let sigtermHandler = new SigtermHandler();
    return sigtermHandler.register(server.stop);
  }
}

module.exports = Command;
