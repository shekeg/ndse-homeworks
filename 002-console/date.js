const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv))
  .check((argv) => {
    const modes = argv._;
    if (modes.length < 1) {
      throw new Error('At least 1 mode should be passed.');
    } else if (modes.length > 1) {
      throw new Error('Only 1 mode may be passed.');
    } else {
      return true;
    }
  })
  .option('y', {
    alias: 'year',
    describe: 'number of years',
    conflicts: ['m', 'd'],
  })
  .option('m', {
    alias: 'month',
    describe: 'number of months',
    conflicts: ['y', 'd'],
  })
  .option('d', {
    alias: 'date',
    describe: 'number of dates',
    conflicts: ['y', 'm'],
  });

console.log(getResult(argv));

function getResult(argv) {
  const currentDate = new Date();

  const MODES = {
    current: [
      {
        match: (argv) => argv.year,
        action: (currentDate) => currentDate.getFullYear(),
      },
      {
        match: (argv) => argv.month,
        action: (currentDate) => currentDate.getMonth(),
      },
      {
        match: (argv) => argv.date,
        action: (currentDate) => currentDate.getDate(),
      },
      {
        // eslint-disable-next-line no-unused-vars
        match: (_) => true,
        action: (currentDate) => currentDate,
      },
    ],
    add: [
      {
        match: (argv) => argv.year,
        action: (currentDate) => new Date(new Date().setFullYear(currentDate.getFullYear() + argv.year)),
      },
      {
        match: (argv) => argv.month,
        action: (currentDate) => new Date(new Date().setMonth(currentDate.getMonth() + argv.month)),
      },
      {
        match: (argv) => argv.date,
        action: (currentDate) => new Date(new Date().setDate(currentDate.getDate() + argv.date)),
      },
    ],
    sub: [
      {
        match: (argv) => argv.year,
        action: (currentDate) => new Date(new Date().setFullYear(currentDate.getFullYear() - argv.year)),
      },
      {
        match: (argv) => argv.month,
        action: (currentDate) => new Date(new Date().setMonth(currentDate.getMonth() - argv.month)),
      },
      {
        match: (argv) => argv.date,
        action: (currentDate) => new Date(new Date().setDate(currentDate.getDate() - argv.date)),
      },
    ],
  };

  const targetAction = MODES[argv._[0]].find((condition) => condition.match(argv));

  if (targetAction) {
    return targetAction.action(currentDate);
  }
  throw new Error('Error in arguments');
}
