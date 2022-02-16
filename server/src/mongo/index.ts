import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/crackwatch-2";

mongoose.plugin(require("@meanie/mongoose-to-json"));

export const getMongoClient = async () => {
    await mongoose.connect(DATABASE_URL);
    return mongoose.connection.getClient();
};

export * from "./models/user";
export * from "./models/account";
