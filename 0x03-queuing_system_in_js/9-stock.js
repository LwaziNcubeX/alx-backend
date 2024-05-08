const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const client = redis.createClient();

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

const getItemById = (id) => listProducts.find((item) => item.itemId === +id);

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:id', async (req, res) => {
  const item = getItemById(req.params.id);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const currentReservedStock = await getCurrentReservedStockById(req.params.id);

  res.json({
    ...item,
    currentQuantity: item.initialAvailableQuantity - currentReservedStock,
  });
});

app.get('/reserve_product/:id', async (req, res) => {
  const item = getItemById(req.params.id);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const currentReservedStock = await getCurrentReservedStockById(req.params.id);

  if (item.initialAvailableQuantity - currentReservedStock <= 0) {
    return res.json({
      status: 'Not enough stock available',
      itemId: req.params.id,
    });
  }

  await reserveStockById(req.params.id, 1);
  return res.json({ status: 'Reservation confirmed', itemId: req.params.id });
});

async function getCurrentReservedStockById(id) {
  const currentStock = await getAsync(`item.${id}`);

  return currentStock ? parseInt(currentStock, 10) : 0;
}

async function reserveStockById(id, stock) {
  const currentStock = await getCurrentReservedStockById(id);

  return setAsync(`item.${id}`, currentStock + stock);
}

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
