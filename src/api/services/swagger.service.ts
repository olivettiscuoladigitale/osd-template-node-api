import * as swaggerJSDoc from "swagger-jsdoc/lib/index";
import * as express from "express";
import * as config from "getconfig";

const pkg = require("../../../package.json");


let swaggerData: swaggerJSDoc.swaggerDefinition; // swagger data model definition

export class SwaggerService {

    /**
     * @description
     * Get default options for swaggered UI
     * @returns {{swaggerDefinition: {info: {title, version}}, apis: [string]}}
     */
    static getOptions(): swaggerJSDoc.options {
        return {
            swaggerDefinition: {
                info: {
                    title: pkg.name, // Title (required)
                    description: pkg.description,
                    version: pkg.version, // Version (required)
                    termOfService: config.swagger.termOfService,
                    contact: config.swagger.contact,
                    license: config.swagger.license
                },
            },
            apis: ["**/*.ts"], // Path to the API docs
        }
    }

    /**
     * @description
     * Get json swaggered file definition
     */
    static getSwaggerJSDoc(): any {
        if (swaggerData) {
            return swaggerData
        }
        swaggerData = swaggerJSDoc(this.getOptions());

        return swaggerData;
    }

    /**
     * @description
     * Init Swagger UI interface
     *
     * @param {object} app - express application object
     * @param {string} url - swagger-ui uri
     */
    static explorer(app: express.Application, url: string = "/docs"): void {
        app.use(url, express.static("./swagger-ui"));
    }


}


