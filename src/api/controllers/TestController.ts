import * as express from "express";

/**
 * A set of standard route.
 * Remove it in production
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 * @copyright Alfabook srl 2017
 */

interface testResponse {
    message: string;
}


/**
 * Basic route
 *
 * @param {e.Request} req
 * @param res
 * @returns {testResponse}
 */
exports.hometest = (req: express.Request, res: any): testResponse => {
    return res.json({message: "home test page"});
};

/**
 * Route protected with jwt
 *
 * inject a valid token in header like:
 *  Autorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtb2RvZ2lvQGdtYWlsLmNvbSJ9.YRzpjcbFHlXGDioaGg1R2BFeH5tTv2okkSebDe4STug
 *
 * @param {e.Request} req
 * @param res
 * @returns {testResponse}
 */
exports.protectedRoute = (req: express.Request, res: any): testResponse => {
    return res.json({message: "this is a protected route"});
};


/**
 * Route with params validation
 * You can see this route only if params is valid
 * Validation is in route files.
 * You can validate params, body, query, headers.
 *
 * For a complete guide refer to: https://github.com/ctavan/express-validator
 * validation schema
 *
 * Implemetation: https://www.npmjs.com/package/json-routing
 *
 *
 * @param {e.Request} req
 * @param res
 * @returns {testResponse}
 */
exports.validateparam = (req: express.Request, res: any): testResponse => {
    return res.json({message: 'good! this route is validated by json'});
};
