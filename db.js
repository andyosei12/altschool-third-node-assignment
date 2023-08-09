const fs = require('fs/promises');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

const getDB = async () => {
  const db = await fs.readFile(DB_PATH, { encoding: 'utf-8' });
  return JSON.parse(db);
};

const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

const insertDB = async (inventory) => {
  const db = await getDB();
  db.inventoryList.push(inventory);
  await saveDB(db);
  return inventory;
};

module.exports = {
  getDB,
  saveDB,
  insertDB,
};
