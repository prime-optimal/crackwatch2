import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import jwt from "jsonwebtoken";

import { userModel } from "@mongo";

import { authenticate } from "@hooks/authenticate";

import ErrorBuilder from "@utils/errorBuilder";

const body = Type.Object(
    {
        jwt: Type.String(),
    },
    { additionalProperties: false }
);

type Body = Static<typeof body>;

const handler: any = async (req: Req<{ Body: Body }>) => {
    const id = req.session.user?.id;
    if (!id) {
        throw new ErrorBuilder().msg("Route needs authentication").status(401);
    }

    const user = await userModel.findById(id);
    if (!user) {
        throw "User not found";
    }

    const { body } = req;

    const secret = user.password + process.env.SECRET;

    try {
        jwt.verify(body.jwt, secret);
    } catch {
        throw new ErrorBuilder().msg("Nah man, sorry").status(403);
    }

    // reset password todo
};

export default (): Resource => ({
    post: {
        handler,
        schema: { body },
        onRequest: authenticate,
    },
});
