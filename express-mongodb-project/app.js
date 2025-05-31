require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const Item = require('./models/Item');

const app = express();

// Підключаємо базу
connectDB();

app.use(express.json());

// Маршрут для отримання всіх Item
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Проста сторінка для відображення items
app.get('/items-view', async (req, res) => {
  try {
    const items = await Item.find();
    let html = '<h1>Items List</h1><ul>';
    items.forEach(item => {
      html += `<li><strong>${item.name}</strong>: ${item.description || 'No description'}</li>`;
    });
    html += '</ul>';
    res.send(html);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
