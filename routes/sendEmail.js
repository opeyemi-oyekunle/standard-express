const express = require('express')
const router = express.Router()

const MailConfig = require('../config/email')
const gmailTransport = MailConfig.GmailTransport
const smtpTransport = MailConfig.SMTPTransport

router.get('/email/gmail', (req, res) => {
  options.from = '"Opeyemi" <oye.opeyemi.oye@gmail.com>'
  gmailTransport.sendMail(options, (error,info) => {
    if(error) res.json(error)
    res.json(info)
  });
});

const smtpEmail = (options, res) => {
  smtpTransport.verify((error, success) => {
      if(error) {
        res.json({error})
      } else {
        smtpTransport.sendMail(options, (error,info) => {
          if(error) {
            res.json({error})
          }
          res.json({info});
        });
      }
  })
}

module.exports = {smtpEmail}
