import { Schema, model } from "mongoose";

import { Provider } from "@types";

export interface Account {
    userId: string;
    providers: Provider[];
    watching: string[];
}

const accountSchema = new Schema<Account>({
    providers: { type: [String], default: ["gamestatus", "steamcrackedgames"] },
    userId: { type: String, required: true },
    watching: { type: [String], default: [] },
});

export const accountModel = model("Account", accountSchema);
