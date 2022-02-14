import { FastifyRequest as Req, RouteOptions } from "fastify";

import { userModel } from "@mongo";

const handler = async (req: Req) => {
    if (!req.session.user) return {};
    const { email } = req.session.user;

    const user = await userModel.findOne({ email });
    if (!user) {
        throw "Unexpected user not found";
    }

    const { nickname, createdAt, avatar } = user;
    return { nickname, email, createdAt, avatar };
};

export default {
    method: "GET",
    url: "/auth/user",
    handler,
} as RouteOptions;
