import { Resource } from "fastify-autoroutes";

export default (): Resource => ({
    get: {
        handler: (req, res) => {
            res.send("Crackwatch 2 API");
        },
    },
});
