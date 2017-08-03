/**
 * Base API project
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 * @copyright Alfabook srl 2017
 */

import * as express from "express";
import * as http from "http";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as config from "getconfig";
import * as path from "path";
import * as methodOverride from "method-override";
import * as compression from "compression";
import * as expressValidator from "express-validator/lib/express_validator";
import {JsonRoute} from "json-routing";
import {StartInfo} from "node-startinfo";
import {NotFoundMdw} from "./lib/notFoundMdw";

// interfaces
import {IRouteInfo} from "json-routing/build/interfaces/IRouteInfo";

// custom services
import {SwaggerService} from "./api/services/swagger.service"; // add swagger definition and explorer
import {JwtMdw} from "./lib/jwtMdw"; // jwt utils middleware


// init express
let app: express.Application = express();
const port: number = process.env.PORT || config.port;

global["rootPath"] = path.join(__dirname, "/.."); // set root path as global
app.set("port", port);


// use declaration
if (config.envName !== "test") {
    app.use(morgan("dev"));
}

app.use(compression());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(JwtMdw.decodeJwtMdw); // decode jwt and add to req


/**
 * Init all routes.
 * For complete docs look at: https://www.npmjs.com/package/json-routing
 */
export const routeInfo: Array<IRouteInfo> = new JsonRoute(app, {
    "routesPath": "../routes",
    "processdir": __dirname,
    "jwt": {
        "secret": config.jwt.secret
    },
    displayCols: [110, 7, 25, 7, 7]
}).start();

// add Swaggered UI
SwaggerService.explorer(app, config.swagger.docsUri);

// enable type doc documentation
if (config.enableTypeDoc) {
    app.use("/typedoc", express.static(path.join(__dirname, "../doc")));
}

// start express http server
let server: http.Server = http.createServer(app);
server.listen(port);

// display info and manage generic errors
let info: StartInfo = new StartInfo(server);
info.onError();
info.onListening();

// manage 403 error
JwtMdw.addErrorRoute(app);

// manage 404 error
NotFoundMdw(app);

console.log("Environment: ", config.envName);
