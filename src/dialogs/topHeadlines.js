const {getTopHeadLines} = require('../helpers/news-api')
const _ = require('lodash')
const {HeroCard, Message, CardImage, CardAction, AttachmentLayout} = require('botbuilder')

const topHeadlines = [
  function(session, args, next){
    session.send('Getting the top head lines')
    session.sendTyping()
    getTopHeadLines(function(error, articles){
      if(_.isEmpty(articles)){
        session.send('sorry I couldn\'t find anything')
        return session.endDialog()
      } else {
        // session.userData.newsie = { articles }
        const msg = new Message(session)
        msg.attachmentLayout(AttachmentLayout.carousel)
        const article = articles[0]

        console.log('====article',article);

        msg.attachments([
          new HeroCard(session)
            .title(article.title)
            .subtitle(`${_.get(article, "source.name", "")}`)
            .text(article.description)
            .images([CardImage.create(session, article.urlImage)])
        ])
        session.send(msg).endDialog();

      }
    })
  }
]

module.exports = topHeadlines
