import {IHomeResponse} from "../../interfaces/IHomeResponse";
import * as express from "express";

/**
 * @swagger
 * tags: [Home]
 * /api/v1:
 *   get:
 *     description: Home page
 *     tags: [Home]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: home page
 *         schema:
 *          type: object
 *          items:
 *              $ref: '#/definitions/Home'
 */

/**
 * Print home page welcome message
 *
 * @param req Request
 * @param res Response
 * @return IHomeResponse - interface object | error object
 */
exports.index = (req: express.Request, res: any): IHomeResponse | any => {
    return res.json({message: "Hi"});
};

/**
 * @swagger
 * tags: [Health]
 * /_ah/health:
 *   get:
 *     description: Health alive
 *     tags: [Health]
 *     produces:
 *       - application/text
 *     responses:
 *       200:
 *         description: Health ping
 */
exports.health = (req: express.Request, res): any | any => {
    return res.send("1");
};
