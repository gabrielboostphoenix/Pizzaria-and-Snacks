// Importing area
import express from 'express';
import cors from 'cors';
import { router } from './routes';

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());
server.use(router);

// Listening server
server.listen(port, () => {
    console.log(`Server Online, The application is running on port ${port}`);
});