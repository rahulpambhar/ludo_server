import express, { Express } from 'express';

import compression from 'compression';
import cors from 'cors'
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import statusCodes from 'http-status-codes';
import path from "path";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";

import user from './src/Routes/User';
import room from './src/Routes/Room';
import setupWebSocket from "./src/Socket";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.enable('trust proxy'); // if you are under reverse proxy

// create a rotating write stream
const accessLogStream = createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(compression({ level: 6, threshold: 0 }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', user);
app.use('/', room);

const server = http.createServer(app);
setupWebSocket(server);

app.use('*', (req, res) => { res.status(statusCodes.OK).send({ st: 'true' }) });

mongoose.connect(`${process.env.DB_URL}`)
    .then(() => { console.log('MongoDB is connected') })
    .catch(err => {
        console.log('MongoDB connection unsuccessful');
        console.log("err", err)
    });

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});