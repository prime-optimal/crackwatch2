import { Static, Type } from "@sinclair/typebox";
import { randomBytes, scrypt } from "crypto";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import { userModel } from "@mongo";

import ErrorBuilder from "@utils/errorBuilder";

const body = Type.Object(
    {
        key: Type.String(),
        password: Type.String({ minLength: 6, maxLength: 100 }),
    },
    { additionalProperties: false }
);

type Body = Static<typeof body>;

const randomBytesPromise = promisify(randomBytes);
const scryptPromise = promisify(scrypt);

const handler: any = async (req: Req<{ Body: Body }>) => {
    const { key, password } = req.body;

    const { id } = jwt.decode(key) as { id: string };

    const user = await userModel.findById(id);
    if (!user) {
        throw new ErrorBuilder().msg("Nah man, sorry").status(403);
    }

    const secret = user.password + process.env.SECRET;

    try {
        jwt.verify(key, secret);
    } catch {
        throw new ErrorBuilder().msg("Nah man, sorry").status(403);
    }

    const salt = (await randomBytesPromise(16)).toString("base64");
    const hashed = ((await scryptPromise(password, salt, 64)) as any as Buffer).toString(
        "base64"
    );

    user.password = `${salt}:${hashed}`;
    await user.save();

    return "OK";
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
    },
});
