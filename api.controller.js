const {
  newInventory,
  getAllInventory,
  findInventory,
  updateInventory,
  removeInventory,
} = require('./db/inventory');

const getAllItems = async (req, res) => {
  const { size } = req.query;
  let inventoryList = await getAllInventory();

  // filtering by size or price
  if (size) {
    inventoryList = inventoryList.filter(
      (inventory) => inventory.size === size
    );
  }

  res.status(200).json({
    data: inventoryList,
    error: null,
  });
};

const createItem = async (req, res) => {
  const inventory = await newInventory(req.body);
  res.status(201).json({
    data: inventory,
    error: null,
  });
};

const getItem = async (req, res) => {
  const id = req.params.id;
  const inventory = await findInventory(id);
  if (inventory.length) {
    res.status(200).json({
      data: inventory,
      eroor: null,
    });
  } else {
    res.status(404).json({
      data: null,
      error: 'Inventory not found',
    });
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const inventory = await updateInventory(id, req.body);
  if (inventory) {
    res.status(200).json({
      data: inventory,
      eroor: null,
    });
  } else {
    res.status(500).json({
      data: null,
      error: 'There was no match for the id provided',
    });
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  const newInventoryList = await removeInventory(id);
  if (newInventoryList) {
    res.status(200).json({ data: newInventoryList, error: null });
  } else {
    res.status(500).json({
      data: null,
      error: 'There was no match for the id provided',
    });
  }
};

module.exports = {
  getAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
