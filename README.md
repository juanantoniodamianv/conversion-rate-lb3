# Conversion Rates

## Configuration
- Use the `.env-example` file to configure your environment variables in `.env`.
- Then run `docker-compose up` to run.
### How to use?

Use this endpoint ```/api/OpenExchangeRates/get-conversion-rate``` to get a conversion rate.

Valid parameters in the query:
- value (value to convert, this is a required field)
- from (base currency, this is a required field)
- to (currency to convert, this is a required field)
- email (email to send the conversion result)
