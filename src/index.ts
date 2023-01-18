require('dotenv').config();
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { usersRoutes } from './routes/users';
import { authRoutes } from './routes/auth';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(cors());

app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, OPTIONS, DELETE'
  );

  next();
});

app.use('/users', usersRoutes);
app.use('/', authRoutes);

mongoose.set('strictQuery', false);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    server.listen(process.env.PORT || 4000, function () {
      console.log('connected to DB');
    });
  } catch (error) {
    console.log(error);
  }
})();
