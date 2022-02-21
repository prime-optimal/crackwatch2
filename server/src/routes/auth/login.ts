import { Static, Type } from "@sinclair/typebox";
import { scrypt, timingSafeEqual } from "crypto";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import { promisify } from "util";

import { userModel } from "@mongo";

import ErrorBuilder from "@utils/errorBuilder";

const body = Type.Object(
    {
        password: Type.String({ minLength: 6, maxLength: 100 }),
        email: Type.String({ maxLength: 100 }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const scryptPromise = promisify(scrypt);

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        throw new ErrorBuilder().status(404).msg("User does not exist");
    }

    const [salt, key] = user.password.split(":");
    const hashed = (await scryptPromise(password, salt, 64)) as Buffer;

    if (!timingSafeEqual(hashed, Buffer.from(key, "base64"))) {
        throw new ErrorBuilder().status(400).msg("Email and/or password is incorrect");
    }

    req.session.user = {
        id: user.id,
    };

    return { ...user.toJSON(), password: undefined };
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
