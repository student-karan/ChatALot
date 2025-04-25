import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dburl = process.env.MONGO_URL;

export async function connectdb() {
    mongoose.connect(dburl)
        .then((res) => console.log("Successfully connected to the host: " + res.connection.host))
        .catch((err) => console.log("Some error occured"));
}