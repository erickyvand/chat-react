import express from 'express';
import AuthRoute from './auth.route';
import ChatRoute from './chat.route';

const app = express();

app.use('/api/auth', AuthRoute);
app.use('/api/chat', ChatRoute);

export default app;
