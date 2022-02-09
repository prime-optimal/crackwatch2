import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyHelmet from "fastify-helmet";

import login from "./auth/login";
import logout from "./auth/logout";
import register from "./auth/register";
import gameSlug from "./game/[slug]";
import games from "./games";
import gamesSearch from "./games/search";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.register(fastifyHelmet);

    fastify.route(login);
    fastify.route(register);
    fastify.route(logout);

    fastify.route(games);
    fastify.route(gameSlug);
    fastify.route(gamesSearch);

    done();
}
