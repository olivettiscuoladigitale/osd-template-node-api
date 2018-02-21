import * as jwt from "express-jwt";
import * as express from "express";
import {IJwtSettings} from "../interfaces/IJwt";
import * as jsonwebtoken from "jsonwebtoken";

/**
 * Manage JWT auth
 */
export namespace JwtMdw {

    /**
     * Add jwt as middleware and manage jwt authentication error
     *
     * @param {express.Application} app - express application
     * @param {IJwtSettings} config jwt - configuration
     */
    export function enable(app: express.Application, config: IJwtSettings) {
        this.addMiddleware(app, config);
        this.addErrorRoute(app);
    }

    /**
     * Add jwt as middleware
     *
     * @param {express.Application} app - express application
     * @param {IJwtSettings} config jwt - configuration
     */
    export function addMiddleware(app: express.Application, config: IJwtSettings): void {
        app.use(jwt({secret: config.secret}).unless({path: (config.unless || [])}));
    }


    export function decodeJwtMdw(req: express.Request, res: express.Response, next: express.NextFunction): void {
        if (req.method === "OPTIONS") {
            return next();
        }

        if (req.headers && req.headers.authorization) {

            const auth: any = req.headers.authorization;
            const parts: Array<string> = auth.split(" ");

            // const parts: Array<string> = req.headers.authorization.split(" ");

            // token  is malformed, exit
            if (parts.length !== 2) {
                return next();
            }
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                req["user"] = jsonwebtoken.decode(credentials);
            }

            next();

        } else {
            next();
        }

    }

    /**
     * Manage JWT authentication error
     *
     * @param {express.Application} app - express application
     */
    export function addErrorRoute(app: express.Application): void {
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): any => {
            if (err.name === "UnauthorizedError") {
                res.status(401).json({message: err.message || "Authorization error", errors: err});
            } else {
                next();
            }
        });
    }

}

