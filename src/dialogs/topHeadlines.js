const {getTopHeadLines} = require('../helpers/news-api')
const _ = require('lodash')
const {HeroCard, Message, CardImage, CardAction, AttachmentLayout} = require('botbuilder')

const topHeadlines = [
  function(session, args, next){
    session.send('Getting the top head lines')
    session.sendTyping()
    getTopHeadLines(function(error, results){
      if(_.isEmpty(results)){
        session.send('sorry I couldn\'t find anything')
        return session.endDialog()
      } else {
        session.userData.newsie = { articles: results }
        const msg = new Message(session)
        msg.attachmentLayout(AttachmentLayout.carousel)
        const attachments = _.map(articles, function(article){

          return new HeroCard(session)
          .title(article.title)
          .subtitle(`${article.source.name}`)
          .text(article.description)
          .images([CardImage.create(session, article.urlImage)])
        })
        msg.attachments(attachments)
        session.send(msg).endDialog();

      }
    })
  }
]

module.exports = topHeadlines
