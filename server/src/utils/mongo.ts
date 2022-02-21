import { FastifyRequest } from "fastify";

import { accountModel } from "@mongo";

export const getAccount = async (req: FastifyRequest) => {
    const account = await accountModel.findOne({ userId: req.session.user?.id || null });
    if (!account) {
        throw "Unexpected account not found";
    }
    return account;
};
