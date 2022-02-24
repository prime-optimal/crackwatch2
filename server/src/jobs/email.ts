import { FastifyInstance } from "fastify";
import cron from "node-cron";
import nodemailer from "nodemailer";
import pLimit from "p-limit";

import { accountModel, userModel } from "@mongo";

import tryToCatch from "@utils/catch";
import SearchCrack from "@utils/searchers";

// send at most 2 emails at once
const limit = pLimit(2);

export default function Schedule(fastify: FastifyInstance) {
    cron.schedule("0 0 * * *", () => {
        nodemailer.createTestAccount(async (err, account) => {
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass, // generated ethereal password
                },
            });

            const accounts = await accountModel.find({
                "settings.notifications": true,
                "watching.0": {
                    $exists: true,
                },
            });

            // call this for every user
            const fetch = async (queries: string[], providers: string[], userId: string) => {
                const promises = queries.map(async query => {
                    const user = await userModel.findById(userId);
                    if (!user) return;

                    const [result] = await tryToCatch(() => SearchCrack(query, providers));

                    if (!result) return;

                    const info = await transporter.sendMail({
                        to: user.email,
                        text: `Great news! "${query}" has been cracked`,
                    });

                    fastify.log.info(nodemailer.getTestMessageUrl(info));
                });

                await Promise.all(promises);
            };

            const inputs = accounts.map(({ watching, providers, userId }) =>
                limit(() =>
                    fetch(
                        watching.map(x => x.item),
                        providers,
                        userId
                    )
                )
            );

            Promise.all(inputs);
        });
    });
}
