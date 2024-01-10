"use strict";

const fetchMock = require("fetch-mock");
const request = require("supertest");

const shipItApi = require("../shipItApi.js");
shipItApi.shipProduct = jest.fn();

const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct
      .mockReturnValue(3);

    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });
      //BUG: This is where we had it before -- request already finished so jest.fn() returns undefined
      // shipItApi.shipProduct
      // .mockReturnValue(3);


    expect(resp.body).toEqual({ shipped: 3 });
    //API {shipped: 3}
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if invalid request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 12,
        name: "",
        addr: "",
        zip: ""
      });

      expect(resp.statusCode).toEqual(400); // add more tests that fail for different reasons
      // id is invalid, zip / address are missing
      // test that we're getting back the right error messages
  });

});


