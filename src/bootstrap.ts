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
import {initLogger, errorLogger, requestLogger} from "./lib/logging";


export class Server {

    public app: any;
    public port: number;
    public routesInfo: Array<IRouteInfo>;
    public isRunning = false;

    /**
     * Call this function to start server
     *
     * @returns {Promise<any>}
     */
    start(): Promise<any> {
        this.app = express();
        this.port = process.env.PORT || config.port;
        this.app.set("port", this.port);

        return this._bootstrap();
    }

    /**
     * bootstrap sequence
     *
     * @returns {Promise<any>}
     */
    _bootstrap(): Promise<any> {
        this._initDebugger();
        this._defaultMiddleware();
        this._startRoutes();
        this._startDefaultServices();
        this._typeDoc();

        return this._serverListener();
    }

    /**
     * Debugger service
     *
     * @private
     */
    private _initDebugger(): void {
        initLogger();

        if (config.envName !== "test") {
            this.app.use(morgan("dev"));
        }

    }

    /**
     * Global middleware
     *
     * @private
     */
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

    /**
     * Load all routes
     *
     * @private
     */
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

    /**
     * Load all global services
     *
     * @private
     */
    private _startDefaultServices(): void {
        // add Swaggered UI
        SwaggerService.explorer(this.app, config.swagger.docsUri);
    }

    /**
     * Create inline doc typeDoc
     *
     * https://github.com/TypeStrong/typedoc
     *
     * @private
     */
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

            /**
             * Server instance
             *
             * @type {"http".Server}
             * @private
             */
            let _server: http.Server = http.createServer(this.app);

            /**
             * Print screen info and base fnc
             */
            const info: StartInfo = new StartInfo(_server);
            info.onError();
            info.onListening();

            /**
             * Start server
             */
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
