import supertest from "supertest";
import { expect } from "chai";

//creating a request
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "6dcf5e03f5e826c9a5d0c64d18e3d1fd8e63b698d38f3de7eb0b86a21b04e91d";

describe.skip("Users", () => {
  it("GET /users - using done() callback", (done) => {
    request.get(`users?access-token=${TOKEN}`).end((err, res) => {
      expect(res.body.data).to.not.be.empty;
      done();
    });
  });

  it("GET /users/:id - by returning the promise", () => {
    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      // expect(res.body.data[4].id).to.be.equal(2460439);
      // console.log(res.body.data[0].id);
    });
  });

  it("GET /users/:id - by using query params", () => {
    const url = `users?access-token=${TOKEN}&page=2`;
    return request.get(url).then((res) => {
      // expect(res.body.data[4].id).to.be.equal(2460439);
      // console.log(res.body);
    });
  });

  it("POST /users - by passing token in headers", () => {
    const data = {
      id: 2484907,
      name: "test name",
      email: `test${Math.floor(Math.random() * 9999)}@email.com`,
      gender: "male",
      status: "inactive",
    };

    return request
      .post(`/users`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        // console.log(res.body);
        expect(res.body.data).to.deep.include(data);
      });
  });

  it("PUT /users/:id", () => {
    const data = {
      status: "active",
      name: `Monkey D Luffy - ${Math.floor(Math.random() * 9999)} `,
    };

    return request
      .put("users/2484907")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
        // console.log(res.body)
      });
  });

  it("DELETE /users/:id", () => {
    return request
      .delete("users/2484907")
      .set("Authorization", `Bearer ${TOKEN}`)
      .then((res) => {
        expect(res.body.data).to.be.equal(null);
      });
  });
});

/*
-NOTES- - - - - - - - - - ->

> ~line:11   - request.get() - adds /users/access-token=xxx to 'request' url
> ~line:12   - .end() - gets the response
> ~line:14   - done() - wait for async call to be completed
> asynchronous behaviour can be hendled by either done() callback or returning the promise
*/
