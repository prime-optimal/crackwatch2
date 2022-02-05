import { FastifyInstance, FastifyPluginOptions } from "fastify";

import gameId from "./game/[id]";
import games from "./games";
import gamesSearch from "./games/search";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.route(games);
    fastify.route(gameId);
    fastify.route(gamesSearch);
    done();
}
