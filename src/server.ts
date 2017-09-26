import * as path from "path";
import {Server} from "./bootstrap";
import {logger} from "./lib/logging";


/**
 * Base API project
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 * @copyright Alfabook srl 2017
 *
 */
global["rootPath"] = path.join(__dirname, "/.."); // set root path as global

export const server: Server = new Server();

if (process.env.NODE_ENV !== "test") {
    server.start().then(_ => {
        logger.debug("server READY!");
    }, err => {
        logger.error("server KO", err);
    });
}
