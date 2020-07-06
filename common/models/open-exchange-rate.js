'use strict';
const axios = require('axios');

module.exports = function(OpenExchangeRate) {

  OpenExchangeRate.getConversionRate = async (value, from, to, email) => {
    try {
      let query = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATE_ID}`);
      let currency = query.data.rates[to];
      if (!currency) {
        let currencies = await axios.get(`https://openexchangerates.org/api/currencies.json?app_id=${process.env.OPEN_EXCHANGE_RATE_ID}`);

        return {
          message: "Currency in 'to' parameter is not valid.",
          currencies: currencies.data
        }
      }
      let result = {
        from,
        to,
        value,
        result: value * currency
      }

      if (email) {
        await OpenExchangeRate.app.models.Email.send({
          to: email,
          from: process.env.GMAIL_USER,
          subject: 'Conversion rate from Open Exchange Rates',
          html: `
            <h4>Conversion Rate:</h4>
            <div>
              Currency from ${from},<br>
              Currency to ${to},<br>
              Result: ${value} ${from} -> ${value * currency} ${to}
            </div>
          `
        });
      }

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  OpenExchangeRate.remoteMethod('getConversionRate', {
    accepts: [
      { arg: 'value', type: 'number', required: true, http: { source: 'query' } },
      { arg: 'from', type: 'string', required: true, http: { source: 'query' }, description: "Only available to USD currency" },
      { arg: 'to', type: 'string', required: true, http: { source: 'query' } },
      { arg: 'email', type: 'string', http: { source: 'query' } }
    ],
    returns: { root: true, type: 'object' },
    http: { path: '/get-conversion-rate', verb: 'get' }
  });

};
