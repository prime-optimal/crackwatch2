import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req, RouteOptions } from "fastify";
import { accountModel } from "mongo/models/account";

import { authenticate } from "@hooks/authenticate";

const body = Type.Object(
    {
        providers: Type.Array(Type.String({ maxLength: 100 }), { default: [] }),
    },
    { additionalProperties: false }
);
type Body = Static<typeof body>;

const handler = async (req: Req<{ Body: Body }>) => {
    if (!req.session.user?.id) {
        throw {
            status: 400,
            message: "This route needs authentication",
        };
    }

    const { providers } = req.body;

    const account = await accountModel.findOne({ userId: req.session.user.id });
    if (!account) {
        throw {
            status: 400,
            message: "The account settings weren't found for some reason",
        };
    }

    account.providers = providers as any;
    await account.save();

    return "OK";
};

export default {
    url: "/account/providers",
    method: "PUT",
    handler,
    schema: { body },
    onRequest: authenticate,
} as RouteOptions;
