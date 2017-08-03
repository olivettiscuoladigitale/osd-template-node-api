/**
 * @description
 * Manage JWT authentications
 * for addition info about JWT please visit:
 *
 * https://tools.ietf.org/html/rfc7519
 * http://jwt.io/introduction/
 *
 * to test use:
 * key: NeverShareYourSecret
 * token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A
 *
 * Remenber that client must define the token as header params like this:
 * Authorization: Bearer mytokenNeedAttentionToBearerThatHasAnUppercaseAndSpaceBeforeToken
 *
 * @module lib/jwt
 * @param app {object}
 * @autor Giorgio Modoni <g.modoni@alfabook.it>
 * @copyright  Alfabook Srl 2017
 */

import * as config from "getconfig";
import * as jsonwebtoken from "jsonwebtoken";
import {ITokens} from "../interfaces/ITokens";

/**
 * Helper methods for JWT
 */
export namespace JwtHelper {
    /**
     * @description
     * create a valid JWT token
     *
     * @param {object} data - data to sign
     * @param {boolean} isRefresh - set params for generate refresh token
     * @return {string} token - jwt token
     */
    export const sign = (data: any, isRefresh: boolean = false): string => {

        let options = config.jwt.options;

        // TODO add a expiration date 1/2 month
        if (isRefresh) {
            delete options.expiresIn;
        }

        return jsonwebtoken.sign(data, config.jwt.secret, options);
    };

    /**
     * @description
     * Decode a jwt token.
     * Use this function to verify
     *
     * @param {string} token - a jwt token
     * @returns {boolean | object} return object if true or false if token is not valid
     */
    export const decode = (token: string): any => {
        try {
            return jsonwebtoken.verify(token, config.jwt.secret);
        } catch (err) {
            return false;
        }
    };

    /**
     * @description
     * decode jwt ignoring signature, no secret needed
     *
     * @param {string} token string to decode
     * @returns {ITokens} tokens signed
     */
    export const decodeUntrusted = (token: string): any => {
        return jsonwebtoken.decode(token);
    };


    /**
     * @description
     * Sign all tokens:
     *  - token
     *  - refresh token
     *
     * @param {any} data - data to sign
     * @returns {ITokens} tokens signed
     */
    export const singAll = (data: any): ITokens => {

        let tokens: ITokens = {token: ""};

        tokens.token = sign(data);
        tokens.refreshToken = sign(data, true);

        return tokens;
    }


}
