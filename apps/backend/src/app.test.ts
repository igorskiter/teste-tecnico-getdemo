const server = require("./app");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
const { Demo, Frame } = require("./model");

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
    const demosMock = [
      { id: 1, html: "ChatGPT", order: 1 },
      { id: 2, html: "Amazon", order: 2 },
    ];

    jest.spyOn(Frame, "findAll").mockResolvedValue(demosMock);

    const res = await requestWithSupertest.get("/frames/1");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(demosMock);
  });

  it("PUT /frames should update frame", async () => {
    // jest.spyOn(Frame, "findOne").mockResolvedValue(demosMock);
    jest.spyOn(Frame, "update").mockResolvedValue([1]);

    const res = await requestWithSupertest.put("/frames/1", {
      html: "ChatGPT2",
      order: 1,
    });

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ success: true });
  });

  it("PUT /frames should error to update frame", async () => {
    // jest.spyOn(Frame, "findOne").mockResolvedValue(demosMock);
    jest.spyOn(Frame, "update").mockResolvedValue([0]);

    const res = await requestWithSupertest.put("/frames/1", {
      html: "ChatGPT2",
      order: 1,
    });

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual({ error: "Nenhum dado foi atualizado!" });
  });
});
