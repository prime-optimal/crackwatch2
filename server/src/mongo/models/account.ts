import { Schema, model } from "mongoose";

import { Provider } from "@types";

export interface Account {
    userId: string;
    providers: Provider[];
}

const accountSchema = new Schema<Account>({
    providers: { Type: [String], default: [], required: true },
    userId: { Type: [String], required: true },
});

export const accountModel = model("Account", accountSchema);
