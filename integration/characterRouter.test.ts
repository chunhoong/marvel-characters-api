import app from "../src/app";
import request from "supertest";

describe("Character api test", () => {

    describe("GET /characters", () => {

        it("should return json with status 200", (done) => {
            request(app)
                .get("/characters")
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body.length).toBe(100);
                    done();
                })
                .catch(done);
        }, 10000);

    });

    describe("GET /characters/{id}", () => {

        it("should return json with status 400 when character id is invalid", (done) => {
            request(app)
                .get("/characters/123")
                .expect(400)
                .expect('Content-Type', /json/)
                .end(error => error ? done(error) : done());
        });

        it("should return json with status 200 when character id is valid", (done) => {
            request(app)
                .get("/characters/1011198")
                .expect(200)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toMatchObject({
                        id: 1011198,
                        name: 'Agents of Atlas',
                        description: ''
                    });
                    done();
                })
                .catch(done);
        });

    });
})

