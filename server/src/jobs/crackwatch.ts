import cron from "node-cron";
import nodemailer from "nodemailer";
import pLimit from "p-limit";

import { accountModel } from "@mongo";

import tryToCatch from "@utils/catch";
import SearchCrack from "@utils/searchers";

// at most send 1 emails at once
const limit = pLimit(1);

export default function Schedule() {
    cron.schedule("* * * * *", () => {
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

            const accounts = await accountModel.find();

            const fetch = async (queries: string[], providers: string[]) => {
                const promises = queries.map(async query => {
                    const [result] = await tryToCatch(() => SearchCrack(query, providers));

                    if (!result) return;

                    await transporter
                        .sendMail({
                            to: "donatas@tronikel.com",
                            text: `${query} has been cracked`,
                        })
                        .then(info => {
                            console.log(nodemailer.getTestMessageUrl(info));
                        });
                });

                await Promise.all(promises);
            };

            const inputs = accounts
                .filter(({ watching }) => watching.length > 0)
                .map(({ watching, providers }) =>
                    limit(() =>
                        fetch(
                            watching.map(x => x.item),
                            providers
                        )
                    )
                );

            Promise.all(inputs);
        });
    });
}
