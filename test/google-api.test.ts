import  * as chai from "chai";
import {URL} from "./test";

const expect = chai.expect;


describe("GOOGLE DRIVE API - MANAGE PERMESSION:", () => {

    /*describe("#createPermissions()", function () {
        it("/POST return No authorization token was found", (done) => {
            chai.request(URL)
                .post("/api/v1/googleapi/permission")
                .set("Content-Type", "application/json")
                // .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .send({
                    "fileId": "0B14mb05-frhINVdJMVZNMGF5Qmc",
                    "groupTeacherEmail": "primo_corso_teachers_e63fcb82@classroom.google.com",
                    "groupEmail": "primo_corso_deecfe39@classroom.google.com"
                })
                .end((err, res) => {
                    // console.log(res);
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it("/POST return File not found", (done) => {
            chai.request(URL)
                .post("/api/v1/googleapi/permission")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .send({
                    "fileId": "0B14mb05-frhINVdJMVZNMGF5Qmc",
                    "groupTeacherEmail": "primo_corso_teachers_e63fcb82@classroom.google.com",
                    "groupEmail": "primo_corso_deecfe39@classroom.google.com"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("/POST return groupTeacherEmail not found", (done) => {
            chai.request(URL)
                .post("/api/v1/googleapi/permission")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .send({
                    "fileId": "0B14mb05-frhINVdJMVZNMGF5Qmc",

                    "groupEmail": "primo_corso_deecfe39@classroom.google.com"
                })
                .end((err, res) => {
                    // console.log(err);
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("/POST return create permissions", (done) => {
            chai.request(URL)
                .post("/api/v1/googleapi/permission")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .send({
                    "fileId": "0B14mb05-frhINVdJMVZNMGF5Qmc.",
                    "groupTeacherEmail": "primo_corso_teachers_e63fcb82@classroom.google.com",
                    "groupEmail": "primo_corso_deecfe39@classroom.google.com"
                })
                .end((err, res) => {
                    // console.log(res);
                    expect(res).to.have.status(200);
                    done();
                });
        });

    });
*/



    describe("#listPermissions()", function () {
        it("/GET return No authorization token was found", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/0B14mb05-frhINVdJMVZNMGF5Qmc")
                .set("Content-Type", "application/json")
                // .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it("/GET return File not found", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/111111")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    // console.log(res);
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it("/GET return list permessions", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/0B14mb05-frhINVdJMVZNMGF5Qmc")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res.body).to.be.a("object");
                    done();
                });
        });

    });

    describe("#getPermission()", function () {
        it("/GET return No authorization token was found", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/4234234/234234234/")
                .set("Content-Type", "application/json")
                // .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it("/GET return File not found", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/0B14mb05-frhINVdJMVZNMGF5Qmc./08072028910443779262")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it("/GET return Permission not found", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/0B14mb05-frhINVdJMVZNMGF5Qmc/08072028910443779262.")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it("/GET return list permessions", (done) => {
            chai.request(URL)
                .get("/api/v1/googleapi/permission/0B14mb05-frhINVdJMVZNMGF5Qmc/08072028910443779262")
                .set("Content-Type", "application/json")
                .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aW5hLmNhcnJvenppbm9AZ21haWwuY29tIiwiaWF0IjoxNDk3ODY0Nzk2LCJleHAiOjE1Mjk0MDA3OTZ9.XkhX6_LZAyq4ts3krSxOkJnyhj0c448RT8Yt-kxTBec")
                .end((err, res) => {
                    expect(res.body).to.be.a("object");
                    done();
                });
        });

    });

});
