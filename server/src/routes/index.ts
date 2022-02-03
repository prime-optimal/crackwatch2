import { FastifyInstance, FastifyPluginOptions } from "fastify";

import games from "./games/popular";

export default async function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.route(games);
    done();
}
