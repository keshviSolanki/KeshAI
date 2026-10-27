import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB Connected");
  } catch (error) {
    console.log("Db Error", error);
  }
};

export default connectDB;
