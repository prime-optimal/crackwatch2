import { FastifyInstance, FastifyPluginOptions } from "fastify";

import gameId from "./game/[id]";
import games from "./games";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.route(games);
    fastify.route(gameId);
    done();
}
