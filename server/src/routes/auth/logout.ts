import { FastifyRequest as Req, FastifyReply as Res } from "fastify";
import { Resource } from "fastify-autoroutes";

const handler: any = (req: Req, res: Res) => {
    req.destroySession(err => {
        if (err) throw err;
        res.clearCookie("session").send("OK");
    });
};

export default (): Resource => ({
    post: {
        handler,
    },
});
