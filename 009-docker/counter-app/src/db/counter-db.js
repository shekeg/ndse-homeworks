const fs = require('fs');

const counterDb = {
  findById({ id }) {
    return new Promise((resolve, reject) => {
      fs.readFile('./db.json', (err, data) => {
        if (err) reject(err);

        const db = JSON.parse(data);

        if (db[id] === undefined) {
          resolve({ [id]: 0 });
        } else {
          resolve({ [id]: db[id] });
        }
      });
    });
  },
  update({ id, value }) {
    return new Promise((resolve, reject) => {
      fs.readFile('./db.json', (err, data) => {
        if (err) reject(err);

        const db = JSON.parse(data);
        db[id] = value;

        fs.writeFile('./db.json', JSON.stringify(db, null, 2), (err) => {
          if (err) reject(err);
          resolve({ [id]: value });
        });
      });
    });
  },
};

exports.counterDb = counterDb;
