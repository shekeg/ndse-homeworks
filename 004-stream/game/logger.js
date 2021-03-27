const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const fs = require('fs');

function createLogger() {
  const { argv } = yargs(hideBin(process.argv))
    .option('f', {
      alias: 'file',
      describe: 'file to log results of game',
      demandOption: true,
    });

  const writable = fs.createWriteStream(`${argv.f}.txt`);

  return {
    write(data) {
      const dateISO = new Date().toISOString();
      const delimiter = '|||';
      writable.write(`${dateISO} ${data} ${delimiter} `);
    },
  };
}

exports.createLogger = createLogger;
