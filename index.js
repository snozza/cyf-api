const Express = require('express');
const bodyParser = require('body-parser');

const msgs = {};

const app = new Express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({}));
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
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
  const msg = req.body;
  msgs[id] = msg;
  res.send(msg);
});

app.delete('/chatroom', (req, res, next) => {
  msgs = {};
});

app.use(Express.static(`${__dirname}/public`));
app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app listening');
});
