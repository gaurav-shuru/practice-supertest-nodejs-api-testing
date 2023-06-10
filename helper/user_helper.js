import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");

const TOKEN =
  "6dcf5e03f5e826c9a5d0c64d18e3d1fd8e63b698d38f3de7eb0b86a21b04e91d";

export const createRandomUser = async () => {
  const userData = {
    name: "Boruto Uzumaki",
    email: `test${Math.floor(Math.random() * 9999)}@email.com`,
    gender: "male",
    status: "inactive",
  };

  const res = await request
    .post(`/users`)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);
  return res.body.data.id;
};
