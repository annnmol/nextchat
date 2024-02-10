import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3005);

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript Node.js server');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
