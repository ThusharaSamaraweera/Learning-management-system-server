import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';

const app = express();
app.use(cors());
express.urlencoded({extended: true})
app.use(express.json());


app.get('/', (req, res) => res.send('API Running'));
app.use('/dev/users', userRoute)

export default app