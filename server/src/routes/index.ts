import { FastifyInstance, FastifyPluginOptions } from "fastify";

import gameSlug from "./game/[slug]";
import games from "./games";
import gamesSearch from "./games/search";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.route(games);
    fastify.route(gameSlug);
    fastify.route(gamesSearch);
    done();
}
