const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const fs = require('fs');

const { createAnalyzer } = require('./analyzer');

const analyzer = createAnalyzer();

const { argv } = yargs(hideBin(process.argv))
  .option('f', {
    alias: 'file',
    describe: 'file to read results of game',
    demandOption: true,
  });

const readable = fs.createReadStream(argv.f, 'utf-8');

readable
  .on('data', analyzer.handleChunk)
  .on('end', analyzer.handleEnd);
