/**
 * Test files
 * Insert application test here.
 * This is the main file.
 * Create test file for controllers/services
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 * @copyright Alfabook srl 2017
 */

import {routeInfo} from "../src/server";
import  * as chai from "chai";


const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;

export const URL = "http://localhost:3000";

chai.use(chaiHttp);


/**
 * @description
 *
 * http://chaijs.com/
 *
 * look at: https://github.com/gimox/json-routing/blob/master/test.ts
 */
describe("Server is Up:", () => {

    it("Has 5 routes", () => {
        routeInfo.length.should.be.eql(5);
    });

    it("/GET return 200", (done) => {
        chai.request(URL)
            .get("/")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it("/_ah/health GET alive return 200", (done) => {
        chai.request(URL)
            .get("/")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it("/notExist GET - must return 404", (done) => {
        chai.request(URL)
            .get("/notExist")
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });


});

/**
 * Add here more test
 *
 * 1) create test in separate files
 * 2) require test this like: require("./auth.test)
 *
 */

require("./testroutes");


