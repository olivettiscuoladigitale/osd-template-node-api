import * as winston from "winston";
import * as expressWinston from "express-winston";
import * as config from "getconfig";

const colorize = process.env.NODE_ENV !== "production";

export let logger;

export const requestLogger = expressWinston.logger({
    level: config.logLevel,
    transports: [
        new winston.transports.Console({
            json: false,
            colorize: colorize
        })
    ],
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
        return false;
    } // optional: allows to skip some log messages based on request and/or response
});

export const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: false,
            colorize: colorize
        })
    ]
});

export function initLogger() {
    logger = new winston.Logger({
        level: config.logLevel,
        colorize: colorize,
        transports: [
            new (winston.transports.Console)()
        ]
    })
}

