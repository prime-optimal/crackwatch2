import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/crackwatch-2";

mongoose.plugin(require("@meanie/mongoose-to-json"));

console.log(DATABASE_URL);

export const getMongoClient = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(DATABASE_URL);
    }
    return mongoose.connection.getClient();
};

if (mongoose.connection.readyState === 0) {
    mongoose.connect(DATABASE_URL, error => {
        if (error) throw error;
    });
}

export * from "./models/user";
export * from "./models/account";
