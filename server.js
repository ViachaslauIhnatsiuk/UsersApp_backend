require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./src/routes/users');

const app = express();

app.use(express.json());
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

app.use('/users', usersRoutes);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to DB');
    });
  })
  .catch((error) => console.log(error));
