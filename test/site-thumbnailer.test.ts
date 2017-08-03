import  * as chai from "chai";
import {SiteThumbnailerService} from "../src/api/services/site-thumbnailer.service";

const siteUrl = "http://www.google.it";
const expect = chai.expect;


describe("Site Thumbnail service:", () => {

    it("should return a base64 thumbnail data", (done) => {

        SiteThumbnailerService.getShot(siteUrl).then(thumbnail => {
            expect(thumbnail).to.be.a("string");
            expect(thumbnail).to.include("data:image/png;base64,");
            done();
        });

    }).timeout(15000);

});


