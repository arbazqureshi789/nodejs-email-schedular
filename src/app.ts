import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
config();
import { Server } from 'node:http';
import { connectDB, disconnectDB } from './database/typeorm';
import { graphqlController } from './controllers/graphQlController';
import onboardingMailService from './services/on-board-email';

let server: Server;

async function start() {
    await connectDB();
    await onboardingMailService.init();
    const app = express();
    server = app.listen(Number.parseInt(process.env.PORT || '5000'), () =>
        console.log(`Server listening on port:${process.env.PORT}`)
    );

    app.use('/graphql', graphqlController);
}

async function stop() {
    onboardingMailService.stop();
    await disconnectDB();
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
