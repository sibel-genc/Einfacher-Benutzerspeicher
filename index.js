const express = require('express');
const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    name: "Jane Austen",
    status: "Ich befinde mich in erträglicher Gesundheit und Stimmung.",
  },
];

app.get('/user', (req, res) => {
  res.json(users);
});

app.get('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

app.post('/user', (req, res) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    status: req.body.status,
  };
  users.push(newUser);
  res.json(newUser);
});

app.patch('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    if (req.body.status) {
      user.status = req.body.status;
      res.json(user);
    } else {
      res.status(400).send('Nur der Status kann aktualisiert werden');
    }
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

app.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send('Benutzer gelöscht');
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
