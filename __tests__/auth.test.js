const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "123456",
      role: "user",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("testuser@example.com");
  });

  it("should login with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "123456"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});



//npm install --save-dev jest supertest
