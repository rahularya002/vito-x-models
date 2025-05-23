import mongoose from 'mongoose';

// Add type declaration for global.mongoose
// eslint-disable-next-line no-var
var globalThisWithMongoose = global as typeof globalThis & { mongoose?: { conn: any; promise: any } };

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'vb';

let cached = globalThisWithMongoose.mongoose;

if (!cached) {
  cached = globalThisWithMongoose.mongoose = { conn: null, promise: null };
}

if (!cached) {
  throw new Error('Could not initialize mongoose cache');
}
cached = cached!;

async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;