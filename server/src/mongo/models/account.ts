import { Schema, model } from "mongoose";

import { Provider } from "@types";

export interface Account {
    userId: string;
    providers: Provider[];
    watching: Watching[];
}

interface Watching {
    cracked: boolean;
    item: string;
    slug: string;
    started: Date;
}

const accountSchema = new Schema<Account>({
    providers: { type: [String], default: ["gamestatus", "steamcrackedgames"] },
    userId: { type: String, required: true },
    watching: {
        validate: [
            (value: any[]) => value.length < 20,
            "Exceeded maximum watching limit (20)",
        ],
        type: [
            new Schema<Watching>({
                cracked: { type: Boolean, required: true },
                item: { type: String, required: true },
                started: { type: Date, required: true },
                slug: { type: String, required: true },
            }),
        ],
    },
});

export const accountModel = model("Account", accountSchema);
