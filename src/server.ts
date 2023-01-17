require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { usersRoutes } from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());
app.use((request, response, next) => {
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
