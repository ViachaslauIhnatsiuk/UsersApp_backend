require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/users');

const app = express();

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

app.use('/api/users', usersRoutes);

app.listen(process.env.PORT, () => {
  console.log('listening!!!');
});
