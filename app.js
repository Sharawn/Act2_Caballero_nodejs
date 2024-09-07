const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let passwords = [];


app.get('/api/passwords', (req, res) => {
  res.json(passwords);
});


app.get('/api/passwords/:index', (req, res) => {
  const index = req.params.index;
  if (passwords[index]) {
    res.json(passwords[index]);
  } else {
    res.status(404).send('Password not found');
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'add.html'));
});


app.post('/add', (req, res) => {
  const { name, password } = req.body;
  passwords.push({ name, password });
  res.redirect('/');
});


app.get('/view/:index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'view.html'));
});


app.post('/delete/:index', (req, res) => {
  const index = req.params.index;
  if (passwords[index]) {
    passwords.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Password manager app listening at http://localhost:${port}`);
});
