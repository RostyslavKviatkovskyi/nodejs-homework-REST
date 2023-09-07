import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";
import app from "../../app.js";
import User from "../../models/user.js";
import {
  describe,
  beforeAll,
  afterAll,
  afterEach,
  test,
  expect,
} from "@jest/globals";

const { DB_HOST_TEST, PORT } = process.env;

describe("test sign up route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup with correct data", async () => {
    const signupData = {
      name: "joshua",
      email: "joshua@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/signup")
      .send(signupData);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
