import { Static, Type } from "@sinclair/typebox";
import { FastifyRequest as Req } from "fastify";
import { Resource } from "fastify-autoroutes";

import { accountModel } from "@mongo";

import { authenticate } from "@hooks/authenticate";

const bodyPut = Type.Object(
    {
        item: Type.String({ maxLength: 300, minLength: 1 }),
        slug: Type.String({ maxLength: 300, minLength: 1 }),
    },
    { additionalProperties: false }
);
type BodyPut = Static<typeof bodyPut>;

const handlerPut: any = async (req: Req<{ Body: BodyPut }>) => {
    const { item, slug } = req.body;

    const account = await accountModel.findOne({ userId: req.session.user?.id || null });
    if (!account) {
        throw {
            statusCode: 401,
            message: "Unexpected user not found",
        };
    }

    if (account.watching.items.find(game => game.slug === slug)) {
        throw {
            statusCode: 400,
            message: "You are already watching this game!",
        };
    }

    account.watching.items.push({ item, slug, started: new Date() });
    await account.save();

    return account.watching;
};

const queryDelete = Type.Object(
    {
        slug: Type.String({ maxLength: 300, minLength: 1 }),
    },
    { additionalProperties: false }
);
type QueryDelete = Static<typeof queryDelete>;

const handlerDelete: any = async (req: Req<{ Querystring: QueryDelete }>) => {
    const { slug } = req.query;

    const account = await accountModel.findOne({ userId: req.session.user?.id || null });
    if (!account) {
        throw {
            statusCode: 401,
            message: "Unexpected user not found",
        };
    }

    for (const [i, game] of account.watching.items.entries()) {
        if (game.slug === slug) {
            account.watching.items.splice(i, 1);
            break;
        }
    }

    await account.save();

    return account.watching;
};

const queryOptions = Type.Object(
    {
        notifications: Type.Boolean(),
    },
    { additionalProperties: false }
);
type QueryOptions = Static<typeof queryOptions>;

const handlerOptions: any = async (req: Req<{ Querystring: QueryOptions }>) => {
    const { notifications } = req.query;

    const account = await accountModel.findOne({ userId: req.session.user?.id || null });
    if (!account) {
        throw {
            statusCode: 401,
            message: "Account unexpectedly not found",
        };
    }

    account.watching.notifications = notifications;
    await account.save();

    return account.watching;
};

export default (): Resource => ({
    put: {
        handler: handlerPut,
        schema: { body: bodyPut },
        onRequest: authenticate,
    },
    delete: {
        handler: handlerDelete,
        schema: { querystring: queryDelete },
        onRequest: authenticate,
    },
    options: {
        handler: handlerOptions,
        schema: { querystring: queryOptions },
        onRequest: authenticate,
    },
});
