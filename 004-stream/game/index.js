const readline = require('readline');

const { createLogger } = require('./logger');
const { createGame } = require('./game');

const rl = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
  prompt: '\nChoose 1️ or 2. Your answer: ',
});

const logger = createLogger();

const { startGame, handleAnswer, handleClose } = createGame(rl, logger);

startGame();

rl.on('line', handleAnswer)
  .on('close', handleClose);
