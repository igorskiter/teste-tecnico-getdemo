const server = require("./app");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("App Endpoints", () => {
  it("GET /demos should show all demos", async () => {
    const res = await requestWithSupertest.get("/demos");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("success");
  });
  
  it("GET /frames should show all frames", async () => {
    const res = await requestWithSupertest.put("/frames/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("success");
  });
});
