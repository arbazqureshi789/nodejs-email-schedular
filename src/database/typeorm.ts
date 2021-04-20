import { getConnectionOptions, createConnection, Connection } from 'typeorm';

let connection: Connection;

export async function connectDB(): Promise<void> {
    // console.log('in connectdb');
    connection = await createConnection();
    if (connection?.isConnected) {
        await connection.query('SELECT 1;');
        console.log('DB connected');
    }
}

export async function disconnectDB(): Promise<void> {
    if (connection?.isConnected) {
        await connection.close();
        console.log('DB disconnected');
    }
}
