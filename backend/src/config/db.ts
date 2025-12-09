// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   try {
//     mongoose.set("strictQuery", false);
    
//     const connection = await mongoose.connect(process.env.MONGO_URI as string, {
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//     });

//     console.log(`✅ MongoDB connected: ${connection.connection.host}`);
    
//     mongoose.connection.on("error", (err) => {
//       console.error("MongoDB connection error:", err);
//     });

//     mongoose.connection.on("disconnected", () => {
//       console.warn("⚠️  MongoDB disconnected");
//     });

//     process.on("SIGINT", async () => {
//       await mongoose.connection.close();
//       console.log("MongoDB connection closed due to app termination");
//       process.exit(0);
//     });
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import { config } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    
    const connection = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
    
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;