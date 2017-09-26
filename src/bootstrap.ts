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
import {IRouteInfo} from "json-routing/build/interfaces/IRouteInfo";
import {StartInfo} from "node-startinfo";

// custom services
import {SwaggerService} from "./api/services/swagger.service"; // add swagger definition and explorer
import {JwtMdw} from "./lib/jwtMdw"; // jwt utils middleware
import {NotFoundMdw} from "./lib/notFoundMdw";
import {logger, initLogger, errorLogger, requestLogger} from './lib/logging';


export class Server {

    public app: any;
    public port: number;
    public routesInfo: Array<IRouteInfo>;
    public isRunning = false;


    start(): Promise<any> {
        this.app = express();
        this.port = process.env.PORT || config.port;
        this.app.set("port", this.port);

        return this.bootstrap();
    }

    bootstrap(): Promise<any> {
        this._initDebugger();
        this._defaultMiddleware();
        this._startRoutes();
        this._startDefaultServices();
        this._typeDoc();

        return this._serverListener();
    }

    private _initDebugger(): void {
        initLogger();

        if (config.envName !== "test") {
            this.app.use(morgan("dev"));
        }

    }

    private _defaultMiddleware(): void {
        this.app.use(compression());
        this.app.use(bodyParser.json({limit: "50mb"}));
        this.app.use(methodOverride());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(errorLogger);
        this.app.use(requestLogger);
        this.app.use(expressValidator());
        this.app.use(JwtMdw.decodeJwtMdw); // decode jwt and add to req
    }

    private _startRoutes(): void {

        const routes: JsonRoute = new JsonRoute(this.app, {
            "routesPath": "../routes",
            "processdir": __dirname,
            "jwt": {
                "secret": config.jwt.secret
            },
            displayCols: [110, 7, 25, 7, 7]
        });

        this.routesInfo = routes.start();

        JwtMdw.addErrorRoute(this.app);
        NotFoundMdw(this.app); // route for not found it must be the last routes
    }


    private _startDefaultServices(): void {
        // add Swaggered UI
        SwaggerService.explorer(this.app, config.swagger.docsUri);
    }

    private _typeDoc(): void {
        if (config.enableTypeDoc) {
            this.app.use("/typedoc", express.static(path.join(__dirname, "../doc")));
        }
    }

    /**
     * Start express server
     *
     * @returns {Promise<any>}
     * @private
     */
    private _serverListener(): Promise<any> {
        return new Promise((resolve, reject) => {

            let _server: http.Server = http.createServer(this.app);

            const info: StartInfo = new StartInfo(_server);
            info.onError();
            info.onListening();

            _server.listen(this.port, err => {
                if (err) {
                    this.isRunning = false;

                    return reject(err);
                }

                this.isRunning = true;

                return resolve(true);
            });

        })
    }

}
