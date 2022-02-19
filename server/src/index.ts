import fastifySession from "@fastify/session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import Fastify from "fastify";
import fastifyAutoRoutes from "fastify-autoroutes";
import fastifyCookie from "fastify-cookie";
import fastifyHelmet from "fastify-helmet";
import fastifyNext from "fastify-nextjs";
import fastifyRateLimit from "fastify-rate-limit";
import path from "path";

import { getMongoClient } from "@mongo";

dotenv.config({ path: path.resolve("../.env") });

const dev = process.env.NODE_ENV !== "production";
const secret = process.env.SECRET || "12345678901234567890-1234567890234546786y5643";

const fastify = Fastify({
    ignoreTrailingSlash: true,
    logger: {
        level: "info",
        serializers: {
            req: req => ({
                remoteAddress: dev ? req.ip : String(req.headers["cf-connecting-ip"]),
                url: req.url,
                hostname: req.hostname,
                method: req.method,
                "user-agent": req.headers["user-agent"],
            }),
        },
    },
    trustProxy: !dev,
});

fastify.register(fastifyRateLimit, {
    max: 200,
    timeWindow: 1000 * 60,
    allowList: req => {
        return (
            // ssr is allowed
            req.headers["ssr-secret"] === process.env.SSR_SECRET ||
            // media is allowed
            req.url.startsWith("/_next/")
        );
    },
    keyGenerator: req =>
        req.headers["cf-connecting-ip"]?.toString() || // cloudflare
        req.headers["x-forwarded-for"]?.toString() || // nginx
        req.ip,
});

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    secret,
    saveUninitialized: false,
    rolling: true,
    cookieName: "session",
    store: MongoStore.create({
        clientPromise: getMongoClient(),
    }),
    cookie: {
        sameSite: "Lax",
        secure: !dev,
        // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
});

fastify.register(fastifyNext, { dev, dir: path.resolve("../../client") }).after(() => {
    fastify.next("/");
    fastify.next("/game/:id");
    fastify.next("/auth/login");
    fastify.next("/auth/register");
    fastify.next("/account");
});

fastify.register(
    (fastify, opts, done) => {
        fastify.register(fastifyHelmet);
        fastify.register(fastifyAutoRoutes, {
            dir: path.resolve("./routes"),
        });
        done();
    },
    { prefix: "/api" }
);

fastify.listen(process.env.PORT || 3000, "0.0.0.0", err => {
    if (err) throw err;
});
