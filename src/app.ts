import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
config();
import { Server } from 'node:http';
import { connectDB, disconnectDB } from './database/typeorm';
import { graphqlController } from './controllers/graphQlController';
import onboardingMailService from './services/on-board-email';

let server: Server = null;

async function start() {
    try {
        await connectDB();
        await onboardingMailService.init();
        const app = express();
        server = app.listen(Number.parseInt(process.env.PORT || '5000'), () =>
            console.log(`Server listening on port:${process.env.PORT}`)
        );

        app.use('/graphql', graphqlController);
    } catch (error) {
        console.log(error);
    }
}

async function stop() {
    try {
        onboardingMailService.stop();
        await disconnectDB();
        console.log('Stopping server.');
        server?.close((err) => {
            if (err) {
                console.error(err);
            }
        });
        console.log('Shutdown complete.');
    } catch (error) {
        console.log(error);
    }
}

start();

process.on('SIGINT', async () => {
    await stop();
});
