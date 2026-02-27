import 'dotenv/config';
import { prisma } from './prisma';

export const dbConnect = () => {
    const DB_CONNECTION_LIMIT = parseInt(process.env.DB_RECONNECT_INTERVAL || '') || 0;
    const DB_RECONNECT_INTERVAL = parseInt(process.env.DB_RECONNECT_INTERVAL || '') || 0;
    let limitCount = 0;

    const connect = async () => {
        try {
            console.log('Database is Connected');
        } catch (err) {
            console.error(`Database connection error: ${(err as Error).message}`);

            limitCount++;
            if (limitCount >= DB_CONNECTION_LIMIT) {
                console.error('Database connection limit reached');
            } else {
                setTimeout(connect, DB_RECONNECT_INTERVAL);
            }
        }
    };

    connect();
};
