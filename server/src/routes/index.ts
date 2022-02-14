import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyHelmet from "fastify-helmet";

import login from "./auth/login";
import logout from "./auth/logout";
import register from "./auth/register";
import user from "./auth/user";
import gameSlug from "./game/[slug]";
import gameScreenshots from "./game/[slug]/screenshots";
import games from "./games";
import gamesSearch from "./games/search";
import nickname from "./validate/nickname";

export default function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    done: () => any
) {
    fastify.register(fastifyHelmet);

    fastify.route(nickname);

    fastify.route(login);
    fastify.route(register);
    fastify.route(logout);
    fastify.route(user);

    fastify.route(gameSlug);
    fastify.route(gameScreenshots);

    fastify.route(games);
    fastify.route(gamesSearch);

    done();
}
