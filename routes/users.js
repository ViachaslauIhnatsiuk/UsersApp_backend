const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.json({ message: 'GET all users' });
});

router.get('/:id', (request, response) => {
  response.json({ message: 'GET a single user' });
});

router.post('/', (request, response) => {
  response.json({ message: 'POST a new user' });
});

router.delete('/:id', (request, response) => {
  response.json({ message: 'DELETE a user' });
});

router.patch('/:id', (request, response) => {
  response.json({ message: 'UPDATE a user' });
});

module.exports = router;
