import express from 'express';
import AuthRoute from './auth.route';

const app = express();

app.use('/api/auth', AuthRoute);

export default app;
