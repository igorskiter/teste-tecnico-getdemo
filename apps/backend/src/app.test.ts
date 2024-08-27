const server = require("./app");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
const { Demo } = require("./model");

describe("App Endpoints", () => {
  it("GET /demos should show all demos", async () => {
    const demosMock = [
      { id: 1, name: "ChatGPT" },
      { id: 2, name: "Amazon" },
    ];

    jest.spyOn(Demo, "findAll").mockResolvedValue(demosMock);

    const res = await requestWithSupertest.get("/demos");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(demosMock);
  });

  it("GET /frames should show all frames", async () => {
    const res = await requestWithSupertest.put("/frames/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("success");
  });
});
