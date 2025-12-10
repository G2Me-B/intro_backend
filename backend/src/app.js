import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express(); // create an express application
app.use(express.json()); // middleware to parse JSON request bodies

// routes definition
app.use('/api/v1/users', userRouter);


export default app;