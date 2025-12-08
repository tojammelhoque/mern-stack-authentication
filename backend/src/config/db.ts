import mongoose from "mongoose";
// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    // Log success message with the host information
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    // Log any connection errors
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Export the connectDB function as the default export
export default connectDB;
