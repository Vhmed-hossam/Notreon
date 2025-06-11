import mongoose from "mongoose";

export default async function connectMongoDB() {
  try {
    const mongodbconnection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(mongodbconnection.connection.host);
  } catch (error) {
    console.log(error);
  }
};