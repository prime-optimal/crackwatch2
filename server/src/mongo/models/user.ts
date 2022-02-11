import { Schema, model } from "mongoose";

export interface User {
    nickname: string;
    password: string;
    email: string;
    createdAt: Date;
    avatar: string;
}

const userSchema = new Schema<User>({
    avatar: { type: String, required: true },
    nickname: { type: String, required: true, minlength: 4, maxlength: 20 },
    password: { type: String, required: true, minlength: 6, maxlength: 400 },
    email: { type: String, required: true, minlength: 4, maxlength: 100 },
    createdAt: { type: Date, required: true, default: () => new Date() },
});

export const userModel = model("User", userSchema);
