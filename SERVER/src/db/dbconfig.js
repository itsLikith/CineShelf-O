import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\nDatabase connection successful! DB hosted at: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

export { connectDB };
