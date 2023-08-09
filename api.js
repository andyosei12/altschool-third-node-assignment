const http = require('http');

const handleResponse = require('./utils/handleResponse');
const bodyParser = require('./utils/bodyParser');

const {
  newInventory,
  getAllInventory,
  findInventory,
  updateInventory,
  removeInventory,
} = require('./inventory');

const port = 8000;

const requestHandler = async (req, res) => {
  const response = handleResponse(req, res);
  // Adding new inventory
  if (req.url === '/v1/inventory' && req.method === 'POST') {
    const inventory = await newInventory(req.body);
    response({ code: 201, data: inventory });
  }

  //   getting all inventories
  if (req.url === '/v1/inventory' && req.method === 'GET') {
    const inventoryList = await getAllInventory();
    response({ code: 200, data: inventoryList });
  }

  //   finding one inventory
  if (req.url.startsWith('/v1/inventory/') && req.method === 'GET') {
    const id = req.url.split('/')[3];
    const inventory = await findInventory(id);
    if (inventory.length) {
      response({ code: 200, data: inventory });
    } else {
      response({ code: 404, error: 'Inventory not found' });
    }
  }

  //   updating an inventory
  if (req.url.startsWith('/v1/inventory/') && req.method === 'PATCH') {
    const id = req.url.split('/')[3];
    const inventory = await updateInventory(id, req.body);
    if (inventory) {
      response({ code: 200, data: inventory });
    } else {
      response({
        code: 500,
        error: 'There was no match for the id provided',
      });
    }
  }

  if (req.url.startsWith('/v1/inventory/') && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    const newInventoryList = await removeInventory(id);
    if (newInventoryList) {
      response({ code: 200, data: newInventoryList });
    } else {
      response({
        code: 500,
        error: 'There was no match for the id provided',
      });
    }
  }
};

// Creating of the server
const server = http.createServer((req, res) =>
  bodyParser(req, res, requestHandler)
);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
