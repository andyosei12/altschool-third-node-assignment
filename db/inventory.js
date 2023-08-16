const { getDB, insertDB, saveDB } = require('./db.js');

const newInventory = async (inventory) => {
  // Creating new inventory object
  const inventoryList = {
    ...inventory,
    id: Math.floor(Math.random() * 500).toString(),
  };

  //   inserting inventory created into db
  await insertDB(inventoryList);
  return inventoryList;
};

const getAllInventory = async () => {
  const { inventoryList } = await getDB();
  return inventoryList;
};

const findInventory = async (id) => {
  const inventoryList = await getAllInventory();
  return inventoryList.filter((inventory) => inventory.id === id);
};

const updateInventory = async (id, updatedBody) => {
  const inventoryList = await getAllInventory();
  //   finding the index of the inventory using the id provided
  const inventoryIndex = inventoryList.findIndex(
    (inventory) => inventory.id === id
  );
  if (inventoryIndex === -1) {
    return null;
  }

  //   Getting the inventory at that index
  const inventory = inventoryList[inventoryIndex];

  //   Creating new updated object
  const update = {
    ...inventory,
    ...updatedBody,
  };

  inventoryList.splice(inventoryIndex, 1, update); // updating the old inventory with the update
  await saveDB({ inventoryList }); // saving the db
  return update;
};

const removeInventory = async (id) => {
  const inventoryList = await getAllInventory();
  const match = inventoryList.find((inventory) => inventory.id === id);

  if (!match) return null;

  const updatedInventory = inventoryList.filter(
    (inventory) => inventory.id !== id
  );
  const db = await saveDB({ inventoryList: updatedInventory });
  return db;
};

module.exports = {
  newInventory,
  getAllInventory,
  findInventory,
  updateInventory,
  removeInventory,
};
