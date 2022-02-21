import { Schema, model } from "mongoose";

import { Provider } from "@types";

export interface Account {
    userId: string;
    providers: Provider[];
    watching: Watching;
}

interface Watching {
    notifications: boolean;
    items: Item[];
}

interface Item {
    cracked?: boolean;
    item: string;
    slug: string;
    started: Date;
}

const accountSchema = new Schema<Account>({
    providers: { type: [String], default: ["gamestatus", "steamcrackedgames"] },
    userId: { type: String, required: true },
    watching: {
        validate: [
            (value: any) => value.items.length < 20,
            "Exceeded maximum watching limit (20)",
        ],
        type: new Schema({
            notifications: { type: Boolean, default: false },
            items: {
                type: [
                    new Schema<Item>({
                        cracked: { type: Boolean, default: false },
                        item: { type: String, required: true },
                        started: { type: Date, required: true },
                        slug: { type: String, required: true },
                    }),
                ],
            },
        }),
        default: { notifications: false, items: [] },
    },
});

export const accountModel = model("Account", accountSchema);
