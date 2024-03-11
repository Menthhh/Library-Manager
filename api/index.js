import express from 'express';
import cors from 'cors';
import dashboardRoute from './routes/dashboard.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/dashboard', dashboardRoute);

app.listen(5000, () => {
    console.log('Server has started on port 5000');
});