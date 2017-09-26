import {server} from "../src/server";
import  * as chai from "chai";
import {URL} from './test';

const chaiHttp = require("chai-http");
const expect = chai.expect;

describe("Test routes", () => {

    before( () => {
        if (!server.isRunning) {
            server.start();
        }
    });

    it('/api/v1/test/protected GET return message: "home test page"', (done) => {
        chai.request(URL)
            .get('/api/v1/test/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('home test page');
                done();
            });
    });


    it('/api/v1/test/protected GET - must return 401', (done) => {
        chai.request(URL)
            .get("/api/v1/test/protected")
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('/api/v1/test/validateparam/23 GET - must return 400', (done) => {
        chai.request(URL)
            .get("/api/v1/test/validateparam/23")
            .end((err, res) => {
                expect(res).to.have.status(400);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Validation error - id Must be between 5 and 10 chars long");
                done();
            });
    });

    it('/api/v1/test/validateparam/232323 GET - must return 200', (done) => {
        chai.request(URL)
            .get("/api/v1/test/validateparam/232323")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("good! this route is validated by json");
                done();
            });
    });







});
