import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import jwt from "jsonwebtoken";
import urlCat from "urlcat";

import { userModel } from "@mongo";

import { transporter } from "@utils/email";

const body = Type.Object(
    {
        email: Type.String(),
    },
    { additionalProperties: false }
);

type Body = Static<typeof body>;

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return "OK";
    }

    const secret = user.password + process.env.SECRET;
    const key = jwt.sign({ id: user.id }, secret, { expiresIn: "15m" });

    const link = urlCat(process.env.BASE_URL || "", "/auth/recover/reset", {
        key,
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset password - Crackwatch 2",
        html:
            `<p>Hello ${user.nickname}</p>` +
            `<p>If you requested to change your password, click this link:</p>` +
            `<a href="${link}">link</a>` +
            `<p>It is only valid for one change and 15 minutes</p>`,
    });

    return "OK";
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
