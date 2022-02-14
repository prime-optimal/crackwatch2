import { Static, Type } from "@sinclair/typebox";
import { randomBytes, scrypt } from "crypto";
import { FastifyRequest as Req, RouteOptions } from "fastify";
import { accountModel } from "mongo/models/account";
import { promisify } from "util";

import { userModel } from "@mongo";

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

const handler = async (req: Req<{ Body: Body }>) => {
    const { email, nickname, password } = req.body;

    if (await userModel.findOne({ $or: [{ email }, { nickname }] })) {
        throw {
            status: 400,
            message: "User already exists",
        };
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

export default {
    url: "/auth/register",
    method: "POST",
    handler,
    schema: { body },
} as RouteOptions;
