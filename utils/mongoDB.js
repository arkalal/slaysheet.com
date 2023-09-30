import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected with MongoDB!!!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
