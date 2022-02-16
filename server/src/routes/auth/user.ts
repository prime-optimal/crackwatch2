import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { accountModel, userModel } from "@mongo";

const handler: any = async (req: Req) => {
    if (!req.session.user) return {};

    const user = await userModel.findById(req.session.user.id);
    if (!user) {
        throw "Unexpected user not found";
    }

    const account = await accountModel.findOne({ userId: user.id });
    if (!account) {
        throw "Unexpected account not found";
    }

    const { nickname, createdAt, avatar, email } = user;
    const { providers } = account;
    return { nickname, email, createdAt, avatar, providers };
};

export default (): Resource => ({
    get: {
        handler,
    },
});
