const readline = require('readline');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const fs = require('fs');

const { createLogger } = require('./logger');
const { createGame } = require('./game');

const rl = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
  prompt: '\nChoose 1️ or 2. Your answer: ',
});

const { argv } = yargs(hideBin(process.argv))
  .option('f', {
    alias: 'file',
    describe: 'file to log results of game',
    demandOption: true,
  });

const logger = createLogger(argv, fs);

const { startGame, handleAnswer, handleClose } = createGame(rl, logger);

startGame();

rl.on('line', handleAnswer)
  .on('close', handleClose);
