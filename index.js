const Express = require('express');
const bodyParser = require('body-parser');

const msgs = {};
const colors = {
  blue: '#0000ff',
  black: '#000000',
  red: '#ff0000',
  green: '008000'
};

const app = new Express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({}));
app.options("/*", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accepts,Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accepts,Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get('/colors/:colorName', (req, res, next) => {
  const colorName = req.params.colorName;
  if (!colorName) {
    return res.status(404).send('Color name not found');
  }
  const color = colors[colorName];
  if (!color) {
    return res.status(404).send('Color not found');
  }
  res.json({ color });
});

app.get('/chatroom', (req, res, next) => {
  const id = req.query.id;
  if (!id || !msgs[id]) {
    return res.status(404).send('Not found');
  }
  res.send(msgs[id]);
});

app.post('/chatroom', (req, res, next) => {
  const id = req.body.id || req.query.id;
  if (!id) {
    return res.status(400).send('Must provide a chat ID');
  }
  let msg;
  if (req.body.message) {
    msg = req.body.message;
  } else if (typeof req.body === 'string') {
    msg = req.body;
  }
  if (!msg) {
    return res.status(400).send(`Can't send an empty message!`);
  }
  msgs[id] = msg;
  res.send(`Message sent to ID ${id}: ${msg}`);
});

app.delete('/chatroom', (req, res, next) => {
  msgs = {};
  res.status(204).send();
});

app.use(Express.static(`${__dirname}/public`));
app.get('/send', (req, res, next) => {
  res.sendFile(`${__dirname}/send.html`);
});
app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app listening');
});
