const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to the app' });
});

app.listen(4000, () => {
  console.log('listening!!!');
});
