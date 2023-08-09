const handleResponse =
  (_, res) =>
  ({ code = 200, error = null, data = null }) => {
    res.setHeader('content-type', 'application/json');
    res.writeHead(code);
    res.write(JSON.stringify({ data, error }));
    res.end();
  };

module.exports = handleResponse;
