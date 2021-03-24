const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const MIN = 0;
const MAX = 100;

const targetNumber = Math.floor(Math.random() * (MAX - MIN) + MIN);

rl.question(`Загадано число в диапазоне от ${MIN} до ${MAX} \n`, (msg) => {
  runChecker(msg);
  rl.on('line', runChecker);
});

function runChecker(msg) {
  if (targetNumber === Number(msg)) {
    console.log(`Отгадано число ${targetNumber}`);
    rl.close();
  }

  if (targetNumber < Number(msg)) {
    console.log('Меньше');
  }

  if (targetNumber > Number(msg)) {
    console.log('Больше');
  }
}
