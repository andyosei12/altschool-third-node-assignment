const path = require('path');

const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('views'));

const HomeIndexPath = path.join(__dirname, 'views', 'index.html');
const NotFoundFile = path.join(__dirname, 'views', '404.html');

app.get('/index.html', async (req, res) => {
  res.status(200).sendFile(HomeIndexPath);
});

app.get('*', async (req, res) => {
  res.status(404).sendFile(NotFoundFile);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
