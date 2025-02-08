import supertest from "supertest";
import app from "../index";

const response = supertest(app);

describe("Testing API Endpoint", () => {
  it("Should Get Status 200", async () => {
    const request = await response.get("/");
    expect(request.status).toBe(200);
  });
});
