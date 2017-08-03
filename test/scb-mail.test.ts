import {InvitationService} from "../src/api/services/invitation.service";
import  * as chai from "chai";
import {URL} from "./test";

const expect = chai.expect;


describe("Send mail :", () => {
    it("Send email invitation course", function (done) {
        InvitationService.sendMailInvitation({
            "to": "c.carrozzino@alfabook.it",
            "fullName": "Krizz Krizz",
            "teacherName": "Cristina Carrozzino",
            "teacherEmail": "cristina.carrozzino@gmail.com",
            "courseName": "TEST - Invitation Course",
            "courseLink": "http://localhost:4200/home"
        }).then((s) => {
            expect(s).to.have.property("messageId");
            expect(s).to.have.property("envelope");
            done();
        }, (err) => {
            done(err);
        });


    });

});

describe("SBC API REST:", () => {

    describe("#authImp()", function () {
        it("/GET return No authorization token was found", (done) => {
            chai.request(URL)
                .get("/api/v1/scb")
                .set("Content-Type", "application/json")
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it("/GET return authenticated", (done) => {
            chai.request(URL)
                .get("/api/v1/scb")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res.body).to.have.property("userId");
                    expect(res.body).to.have.property("sbEmail");
                    expect(err).to.be.null;
                    done();
                });
        });
    });

    describe("#login()", function () {

        it("/POST return No authorization token", (done) => {
            chai.request(URL)
                .post("/api/v1/scb/login")
                .set("Content-Type", "application/json")
                .send({username: "f.leoni@hoplo.com", password: "123456"})
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it("/POST return Username or password invalid", (done) => {
            chai.request(URL)
                .post("/api/v1/scb/login")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .send({username: "ff.leoni@hoplo.com", password: "123456"})
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property("message");
                    done();
                });
        });


        it("/POST return authenticated", (done) => {
            chai.request(URL)
                .post("/api/v1/scb/login")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .send({username: "f.leoni@hoplo.com", password: "123456"})
                .end((err, res) => {
                    expect(res.body).to.have.property("userId");
                    expect(res.body).to.have.property("completeName");
                    expect(err).to.be.null;
                    done();
                });
        });
    });

    describe("#createAccount()", function () {
        // TODO
        console.log("coming soon");
    });

    describe("#library()", function () {
        it("/GET return No authorization token", (done) => {
            chai.request(URL)
                .get("/api/v1/scb/library")
                .set("Content-Type", "application/json")
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        this.timeout(10000);
        it("/GET return library", (done) => {
            chai.request(URL)
                .get("/api/v1/scb/library")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")

                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });


});
