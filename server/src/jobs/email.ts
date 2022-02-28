import cron from "node-cron";
import nodemailer from "nodemailer";
import pLimit from "p-limit";
import pino from "pino";

import { Item, accountModel, userModel } from "@mongo";

import tryToCatch from "@utils/catch";
import SearchCrack from "@utils/searchers";

const logger = pino();

// send at most 1 emails at once
const limit = pLimit(1);

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: true,
});

export default function Schedule() {
    cron.schedule("0 0 * * *", async () => {
        const accounts = await accountModel.find({
            "settings.notifications": true,
            "watching.0": {
                $exists: true,
            },
        });

        // call this for every user
        const fetch = async (queries: Item[], providers: string[], userId: string) => {
            const account = await accountModel.findOne({ userId });
            if (!account?.watching) return;

            const promises = queries.map(async query => {
                const user = await userModel.findById(userId);
                if (!user) return;

                if (query.cracked) return;

                const [result] = await tryToCatch(() => SearchCrack(query.item, providers));

                if (!result || (result && result.result.length < 1)) return;

                const info = await transporter.sendMail({
                    to: user.email,
                    text: `Great news! "${query.item}" has been cracked`,
                });

                for (const [index, item] of account.watching.entries()) {
                    if (item.slug === query.slug) {
                        account.watching[index].cracked = true;
                        break;
                    }
                }

                logger.info(`${query.item} has been cracked and sent to ${user.email}`);
            });

            await Promise.all(promises);
            await account.save();
        };

        const inputs = accounts.map(({ watching, providers, userId }) =>
            limit(() => fetch(watching, providers, userId))
        );

        Promise.all(inputs);
    });
}
