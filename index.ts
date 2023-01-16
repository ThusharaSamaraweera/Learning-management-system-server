import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';

const app = express();
app.use(cors());
express.urlencoded({extended: true})
app.use(express.json());

app.use('/users', userRoute)

export default app