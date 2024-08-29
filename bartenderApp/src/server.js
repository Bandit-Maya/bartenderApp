
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let menu = [
  { id: 1, name: 'Mojito' },
  { id: 2, name: 'Martini' },
  { id: 3, name: 'Dirty Shirley' }
];

let orders = [];

app.get('/menu', (req, res) => {
  res.json(menu);
});

app.post('/orders', (req, res) => {
  const order = req.body;
  order.id = orders.length + 1;
  orders.push(order);
  res.status(201).json(order);
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.delete('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  orders = orders.filter(order => order.id !== orderId);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
