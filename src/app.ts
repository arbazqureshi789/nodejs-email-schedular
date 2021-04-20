import express from 'express';
import { config } from 'dotenv';
config();
import { Server } from 'node:http';

let server: Server;

async function start() {
    const app = express();
    server = app.listen(Number.parseInt(process.env.PORT || '5000'), () =>
        console.log(`Server listening on port:${process.env.PORT}`)
    );
}

async function stop() {
    console.log('Stopping server.');
    server?.close((err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log('Shutdown complete.');
}

start();

process.on('SIGINT', async () => {
    await stop();
});
