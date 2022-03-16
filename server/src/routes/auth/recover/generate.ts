import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";
import jwt from "jsonwebtoken";

import { userModel } from "@mongo";

import { authenticate } from "@hooks/authenticate";

import ErrorBuilder from "@utils/errorBuilder";

const handler: any = async (req: Req) => {
    const id = req.session.user?.id;
    if (!id) {
        throw new ErrorBuilder().msg("Route needs authentication").status(401);
    }

    const user = await userModel.findById(id);
    if (!user) {
        throw "User was not found";
    }

    const secret = user.password + process.env.SECRET;

    const password = jwt.sign({ id }, secret, { expiresIn: "15m" });

    return password;
};

export default (): Resource => ({
    get: {
        handler,
        onRequest: authenticate,
    },
});
