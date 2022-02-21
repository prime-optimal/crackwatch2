import { Static, Type } from "@sinclair/typebox";
import { randomBytes, scrypt } from "crypto";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import { promisify } from "util";

import { accountModel, userModel } from "@mongo";

import ErrorBuilder from "@utils/errorBuilder";

const body = Type.Object(
    {
        nickname: Type.String({ minLength: 4, maxLength: 20 }),
        password: Type.String({ minLength: 6, maxLength: 100 }),
        email: Type.String({ maxLength: 100 }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const randomBytesPromise = promisify(randomBytes);
const scryptPromise = promisify(scrypt);

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { email, nickname, password } = req.body;

    if (await userModel.findOne({ $or: [{ email }, { nickname }] })) {
        throw new ErrorBuilder().status(400).msg("User already exists");
    }

    const salt = (await randomBytesPromise(16)).toString("base64");
    const hashed = ((await scryptPromise(password, salt, 64)) as any as Buffer).toString(
        "base64"
    );

    const avatar = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
        nickname
    )}.svg`;

    const user = await userModel.create({
        email,
        nickname,
        password: `${salt}:${hashed}`,
        avatar,
    });

    await accountModel.create({
        userId: user.id,
    });

    return "OK";
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
