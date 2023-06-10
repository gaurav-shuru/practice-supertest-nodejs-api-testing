import supertest from "supertest";
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";

//creating a request
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "6dcf5e03f5e826c9a5d0c64d18e3d1fd8e63b698d38f3de7eb0b86a21b04e91d";

describe("Users", () => {
  let userID;
  /* POST - Creating a user */
  describe("POST - Creating a user", () => {
    it("/users", () => {
      const data = {
        name: "Boruto Uzumaki",
        email: `test${Math.floor(Math.random() * 9999)}@email.com`,
        gender: "male",
        status: "inactive",
      };

      return request
        .post(`/users`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          userID = res.body.data.id;
          // console.log(`user_id : ${userID}`);
        });
    });
  });

  /* GET - Getting user data */
  describe("GET - Fetching user data", () => {
    it("/users/:id", () => {
      request.get(`users/${userID}?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
        console.log(res.body.data);
      });
    });
  });

  describe("PUT - Updating the data", () => {
    it("/users/:id", () => {
      const data = {
        status: "active",
        name: `Kawaki Uzumaki - ${Math.floor(Math.random() * 9999)} `,
      };

      return request
        .put(`users/${userID}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          console.log(res.body);
        });
    });
  });

  describe("DELETE - Deleting the existing user", () => {
    it("/users/:id", () => {
      return request
        .delete(`users/${userID}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body.data).to.be.equal(null);
          console.log(res.body.data);
        });
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
