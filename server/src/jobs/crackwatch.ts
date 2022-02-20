import cron from "node-cron";
import nodemailer from "nodemailer";

export default function Schedule() {
    cron.schedule("* * * * *", () => {
        nodemailer.createTestAccount((err, account) => {
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

            transporter
                .sendMail({
                    to: "donatas@tronikel.com",
                    text: "Hello",
                })
                .then(info => {
                    console.log(nodemailer.getTestMessageUrl(info));
                });
        });
    });
}
