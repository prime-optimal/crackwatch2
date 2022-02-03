import dotenv from "dotenv";
import Fastify from "fastify";
import fastifyNext from "fastify-nextjs";

import routes from "./routes";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";

const fastify = Fastify({
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

fastify.register(fastifyNext, { dev, dir: "../../client" }).after(() => {
    fastify.next("/");
    fastify.next("/popular");
});

fastify.register(routes, { prefix: "/api" });

fastify.listen(process.env.PORT || 3000, "0.0.0.0", err => {
    if (err) throw err;
});
