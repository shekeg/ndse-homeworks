function createLogger(argv, fs) {
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
