import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import socket from 'socket.io';
import routes from './routes';
import ResponseService from './services/response.service';

config();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('Database connected'));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use('/', routes);
app.get('/', (req, res) => {
	ResponseService.setError(200, 'Welcome to React chat API');
	return ResponseService.send(res);
});
app.use('/', (req, res) => {
	ResponseService.setError(404, 'You have provided a wrong route');
	return ResponseService.send(res);
});

const port = 4500 || process.env.PORT;

const server = app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

const io = socket(server);

io.on('connection', socket => {
	console.log('Made socket connection');
});

export default app;
