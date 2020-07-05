'use strict';

module.exports = {
  email: {
    connector: "mail",
    transports: [{
      type: "smtp",
      host: "smtp.gmail.com",
      secure: false,
      port: 587,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    }]
  }
};