import supertest from "supertest";
import APP from "../index";

const response = supertest(APP);

describe("Testing API Endpoint", () => {
  it("Should Get Status 200", async () => {
    const request = await response.get("/");
    expect(request.status).toBe(200);
  });
});
