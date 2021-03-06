import cron from "node-cron";
import pLimit from "p-limit";
import pino from "pino";

import { Item, accountModel, userModel } from "@mongo";

import tryToCatch from "@utils/catch";
import { transporter } from "@utils/email";
import SearchCrack from "@utils/searchers";

const logger = pino();

// send at most 1 emails at once
const limit = pLimit(1);

export default function Schedule() {
    logger.info("A scheduled job has been assigned");

    transporter.verify(error => {
        if (error) {
            logger.error(error);
            return;
        }

        logger.info("Email server is ready");
    });

    cron.schedule("0 */6 * * *", async () => {
        logger.info(`Started a scheduled job, current time is ${new Date().toDateString()}`);

        const accounts = await accountModel.find({
            "settings.notifications": true,
            "watching.0": {
                $exists: true,
            },
        });

        logger.info(`Found ${accounts.length} accounts with notifications on`);

        // call this for every user
        const fetch = async (queries: Item[], providers: string[], userId: string) => {
            const account = await accountModel.findOne({ userId });
            if (!account) return;

            const user = await userModel.findById(userId);
            if (!user) return;

            const promises = queries.map(async query => {
                if (query.cracked) return;

                const [games] = await tryToCatch(() => SearchCrack(query.item, providers));

                if (!games || !games.result) return;

                try {
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        subject: "Crackwatch game update",
                        to: user.email,
                        text: `Great news! "${
                            query.item
                        }" has been cracked.\nYou started watching this game in ${new Date(
                            query.started
                        ).toDateString()}.\nFinally, the wait is over!!!`,
                    });
                } catch (error) {
                    logger.error(error);
                    return;
                }

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
