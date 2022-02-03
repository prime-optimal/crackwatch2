import { FastifyInstance, FastifyPluginOptions } from "fastify";

import games from "./games/popular";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.route(games);
    done();
}
