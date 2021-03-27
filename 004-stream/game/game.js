const { randomIntFromInterval } = require('./utils');

function createGame(rl, logger) {
  const state = {
    rightAnswer: null,
  };

  function startGame() {
    console.log('Welcome!');
    resetRightAnswer();
    rl.prompt();
  }

  function resetRightAnswer() {
    state.rightAnswer = randomIntFromInterval(1, 2);
  }

  function handleAnswer(answer) {
    const answerNumber = Number(answer.trim());

    if (answerNumber !== 1 && answerNumber !== 2) {
      console.error('💔 Your answer isn\'t 1 or 2');
    } else {
      const result = Number(answer) === state.rightAnswer ? 'win' : 'lose';
      console.log(`You ${result}`);
      logger.write(result);
      resetRightAnswer();
    }

    rl.prompt();
  }

  function handleClose() {
    console.log('\n');
    console.log('🌞 Have a great day!');
    process.exit(0);
  }

  return {
    startGame,
    handleAnswer,
    handleClose,
  };
}

exports.createGame = createGame;
