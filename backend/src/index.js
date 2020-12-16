import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import routes from './routes';

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

app.use('/', routes);

const port = 4500 || process.env.PORT;

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
