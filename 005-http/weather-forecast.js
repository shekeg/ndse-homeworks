const http = require('http');
const { API_SOURCE, API_TOKEN } = require('./config');

if (!API_SOURCE) {
  throw Error('API_SOURCE is empty');
}

if (!API_TOKEN) {
  throw Error('API_TOKEN is empty');
}

function createWeatherInfo() {
  function getByCity(city) {
    return new Promise((resolve, reject) => {
      http.get(`${API_SOURCE}/forecast?access_key=${API_TOKEN}&query=${city}`, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error('Error'));
        }

        res.setEncoding('utf8');

        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });

        res.on('end', () => {
          const result = JSON.parse(rawData);
          resolve(result);
        });
      });
    });
  }

  return {
    getByCity,
  };
}

exports.createWeatherInfo = createWeatherInfo;
