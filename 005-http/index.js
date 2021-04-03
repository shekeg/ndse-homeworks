const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { createWeatherInfo } = require('./weather-forecast');

const { argv } = yargs(hideBin(process.argv))
  .option('c', {
    alias: 'city',
    describe: 'city to show weather forecast',
    demandOption: true,
  });

const weatherInfo = createWeatherInfo();

weatherInfo.getByCity(argv.c)
  .then((res) => {
    console.log(res.forecast);
  })
  .catch(console.error);
