"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");

const jsonschema = require("jsonschema");
const orderDetailsSchema = require("../schemas/orderDetailsSchema.json");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {

  const result = jsonschema.validate(
    req.body, orderDetailsSchema, {required : true});

  if (!result.valid) {
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  debugger;

  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  // const shipId = 3 (shipProduct just returns a number, like 3)

  debugger;

  return res.json({ shipped: shipId });
});


module.exports = router;