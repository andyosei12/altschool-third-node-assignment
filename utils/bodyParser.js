const bodyParser = (req, res, callback) => {
  const body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    if (body.length) {
      const parsedBody = Buffer.concat(body).toString();
      req.body = JSON.parse(parsedBody);
    }

    callback(req, res);
  });
};

module.exports = bodyParser;
