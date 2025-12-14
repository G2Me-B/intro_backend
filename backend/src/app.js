import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express(); // create an express application
app.use(express.json()); // middleware to parse JSON request bodies

// routes definition
app.use('/api/v1/users', userRouter);

// http://localhost:5001/api/v1/users/register

export default app;