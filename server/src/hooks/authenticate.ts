import type { onRequestHookHandler } from "fastify";

export const authenticate: onRequestHookHandler = (req, res, done) => {
    if (!req.session.user?.id) {
        res.status(401).send("You need to be authorized for this route");
        return;
    }
    done();
};
