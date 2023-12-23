import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { middleware } from './middleware';

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());
server.use(router);
server.use(middleware);

server.listen(port, () => {
    console.log(`Server Online, The application is running on port ${port}`);
});