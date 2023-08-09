const http = require('http');
const fs = require('fs');

const port = 5000;

const requestHandler = (req, res) => {
  if (req.url === '/') {
    const file = fs.readFileSync('./index.html');
    res.setHeader('content-type', 'text/html');
    res.writeHead(200);
    res.write(file);
    res.end();
  }

  if (req.url.endsWith('.html') && req.method === 'GET') {
    try {
      const [_, fileName] = req.url.split('/');
      const fileLocation = `./${fileName}`;
      const file = fs.readFileSync(fileLocation);
      res.setHeader('content-type', 'text/html');
      res.writeHead(200);
      res.write(file);
      res.end();
    } catch (error) {
      const file = fs.readFileSync('./404.html', { encoding: 'utf-8' });
      res.setHeader('content-type', 'text/html');
      res.writeHead(500);
      res.write(file);
      res.end();
    }
  }
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
