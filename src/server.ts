require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import { usersRoutes } from './routes/users';

const app = express();

app.use(express.json());
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

app.use('/users', usersRoutes);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to DB');
    });
  })
  .catch((error) => console.log(error));
