import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

const connect = async () => {
    // TODO: check error
    // const uri = mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    await mongoose.connect('mongodb://127.0.0.1:27017/flash', mongooseOpts);
}

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export default {
    connect,
    closeDatabase,
    clearDatabase,
}