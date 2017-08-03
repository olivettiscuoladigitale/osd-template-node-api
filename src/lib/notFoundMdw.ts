import * as express from "express";

// create  interface for response
interface notFoundJson {
    error: string;
}

type notFound = notFoundJson | string;

// add middleware
export function NotFoundMdw(app) {
    app.use((req: express.Request, res: express.Response, next: express.NextFunction): notFound => {
        res.status(404);

        if (req.accepts("json")) {
            res.send({error: "route Not found"});
            return;
        }

        res.type("txt").send("route Not found");
    });
}
