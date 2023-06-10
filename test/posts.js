import request from "../config/common";
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";
import { faker } from "@faker-js/faker";
require('dotenv').config()

const TOKEN = process.env.USER_TOKEN

describe("TESTING posts API", () => {
  let userID, postId;
  describe("User Posts", () => {
    // const user_id = `2460${Math.floor(Math.random() * 999)}`

    before(async () => {
      userID = await createRandomUser();
    });

    it("POST /posts", async () => {
      const data = {
        user_id: userID,
        title: "Title doesn't matter",
        body: "Body doesn't matter",
      };

      const postRes = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);

      expect(postRes.body.data).to.deep.include(data);
      postId = postRes.body.data.id;
      console.log(postRes.body);
    });

    /* GET */
    it("GET /posts/:id", async () => {
      await request
        .get(`posts/${postId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .expect(200);

      // console.log(res.body);
    });
  });

  describe.only("Negative Tests", () => {
    it("401 Authentication failed", async () => {
      const data = {
        user_id: userID,
        title: faker.internet.userName(),
        body: faker.internet.displayName(),
      };

      const postRes = await request.post("posts").send(data);

      expect(postRes.body.code).to.be.eq(401);
      expect(postRes.body.data.message).to.be.eq("Authentication failed");
      // postId = postRes.body.data.id;
      // console.log(postRes.body);
    });

    it("422 Validation failed", async () => {
      const data = {
        user_id: userID,
        title: "Title doesn't matter",
      };

      const postRes = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);

      expect(postRes.body.code).to.eq(422);
      expect(postRes.body.data[2].field).to.eq("body");
      expect(postRes.body.data[2].message).to.eq("can't be blank");
      // postId = postRes.body.data.id;
      // console.log(postRes.body);
    });
  });
});
