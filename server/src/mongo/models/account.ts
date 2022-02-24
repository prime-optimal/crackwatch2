import { Schema, model } from "mongoose";

import { Provider } from "@types";

export interface Account {
    userId: string;
    providers: Provider[];
    watching: Item[];
    settings: Settings;
}

interface Settings {
    notifications: boolean;
}

export interface Item {
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
            (value: any[]) => value.length < 20,
            "Exceeded maximum watching limit (20)",
        ],
        type: [
            new Schema<Item>({
                cracked: { type: Boolean, default: false },
                item: { type: String, required: true },
                started: { type: Date, required: true },
                slug: { type: String, required: true },
            }),
        ],
        default: [],
    },
    settings: {
        type: new Schema<Settings>({
            notifications: { type: Boolean },
        }),
        default: { notifications: false },
    },
});

export const accountModel = model("Account", accountSchema);
