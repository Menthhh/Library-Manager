import express from 'express';
import cors from 'cors';
import dashboardRoute from './routes/dashboard.js';
import authRoute from './routes/auth.js';
import borrowRoute from './routes/borrow.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use('/dashboard', dashboardRoute);
app.use('/auth', authRoute);
app.use('/borrow', borrowRoute);

app.listen(5000, () => {
    console.log('Server has started on port 5000');
});