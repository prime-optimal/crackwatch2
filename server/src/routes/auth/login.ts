import { Static, Type } from "@sinclair/typebox";
import { scrypt, timingSafeEqual } from "crypto";
import { FastifyRequest as Req, RouteOptions } from "fastify";
import { promisify } from "util";

import { userModel } from "@mongo";

const body = Type.Object(
    {
        password: Type.String({ minLength: 6, maxLength: 100 }),
        email: Type.String({ maxLength: 100 }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const scryptPromise = promisify(scrypt);

const handler = async (req: Req<{ Body: Body }>) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        throw {
            status: 404,
            message: "User does not exist",
        };
    }

    const [salt, key] = user.password.split(":");
    const hashed = (await scryptPromise(password, salt, 64)) as Buffer;

    if (!timingSafeEqual(hashed, Buffer.from(key, "base64"))) {
        throw {
            status: 400,
            message: "Email and/or password is incorrect",
        };
    }

    const sessionUser = {
        email,
        nickname: user.nickname,
        avatar: user.avatar,
    };
    req.session.user = sessionUser;

    return sessionUser;
};

export default {
    url: "/auth/login",
    method: "POST",
    handler,
    schema: { body },
} as RouteOptions;
