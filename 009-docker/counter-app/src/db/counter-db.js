const fs = require('fs');

const counterDb = {
  findById({ id }) {
    return new Promise((resolve, reject) => {
      fs.readFile('./db-storage/db.json', (err, data) => {
        if (err) reject(err);

        if (data !== undefined) {
          const db = JSON.parse(data);

          if (db[id] === undefined) {
            resolve({ [id]: 0 });
          } else {
            resolve({ [id]: db[id] });
          }
        } else {
          reject(new Error('File reading error. Data is undefined.'));
        }
      });
    });
  },
  update({ id, value }) {
    return new Promise((resolve, reject) => {
      fs.readFile('./db-storage/db.json', (err, data) => {
        if (err) reject(err);

        if (data !== undefined) {
          const db = JSON.parse(data);
          db[id] = value;

          fs.writeFile('./db-storage/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) reject(err);
            resolve({ [id]: value });
          });
        } else {
          reject(new Error('File reading error. Data is undefined.'));
        }
      });
    });
  },
};

exports.counterDb = counterDb;
