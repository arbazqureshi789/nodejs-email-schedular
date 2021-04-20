import express, { request, response } from 'express';
import { config } from 'dotenv';
config();
import { Server } from 'node:http';
import { graphqlHTTP } from 'express-graphql';
import { queryResolver } from './graphQl/resolver';
import { querySchema } from './graphQl/schema';
import { connectDB, disconnectDB } from './database/typeorm';

let server: Server;

async function start() {
    await connectDB();
    const app = express();
    server = app.listen(Number.parseInt(process.env.PORT || '5000'), () =>
        console.log(`Server listening on port:${process.env.PORT}`)
    );

    app.use(
        '/graphql',
        graphqlHTTP({
            schema: querySchema,
            rootValue: queryResolver,
            graphiql: true,
            context: {
                req: request,
                res: response,
            },
        })
    );
}

async function stop() {
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
