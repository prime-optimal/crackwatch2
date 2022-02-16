import { Schema, model } from "mongoose";

import { Provider } from "@types";

export interface Account {
    userId: string;
    providers: Provider[];
}

const accountSchema = new Schema<Account>({
    providers: { type: [String], default: ["gamestatus", "steamcrackedgames"] },
    userId: { type: String, required: true },
});

export const accountModel = model("Account", accountSchema);
