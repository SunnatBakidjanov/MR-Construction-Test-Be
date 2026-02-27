import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { dbConnect } from './db/dbConnect';
import { resourcesRoute } from './routes/resourcesRoute';

const app = express();
const PORT = process.env.APP_PORT;

if (!PORT) {
    console.error('PORT is not defined');
    process.exit(1);
}

app.use(
    cors({
        origin: ['http://localhost:5173'],
    })
);

dbConnect();

app.use(express.json());

app.use('/api/resources', resourcesRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
