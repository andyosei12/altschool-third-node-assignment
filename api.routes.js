const express = require('express');
const {
  getItem,
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./api.controller');

const router = express.Router();

router.get('/', getAllItems);
router.post('/', createItem);
router.get('/:id', getItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);

router.get('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

module.exports = router;
