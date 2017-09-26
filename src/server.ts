/**
 * Base API project
 *
 * Entry point file
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 * @copyright Alfabook srl 2017
 *
 */
import * as path from "path";
import {Server} from "./bootstrap";
import {logger} from "./lib/logging";


/**
 * Use Global to require root path
 *
 * @type {string}
 */
global["rootPath"] = path.join(__dirname, "/.."); // set root path as global

/**
 * Server app
 * server.app: Express.aplication
 *
 * @type {Server}
 */
export const server: Server = new Server();


/**
 * Start server only if environment is not "test"
 */
if (process.env.NODE_ENV !== "test") {
    server.start().then(_ => {
        logger.debug("server READY!");
    }, err => {
        logger.error("server KO", err);
    });
}
