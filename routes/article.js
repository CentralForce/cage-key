const express = require("express");
const router = express.Router();
const validator = require("express-validator");
const database = require("../drivers/database");

// just for debugging
router.get("/all", async (req, res) => {});

router.get("/find", (req, res) => {});

router.get("/range", (req, res) => {});

router.post(
  "/publish",
  [
    validator.body("text").isString(),
    validator.body("entities.hashtags").isArray(),
    validator.body("entities.urls").isArray(),
    validator.body("media").isArray()
  ],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      res.send(await database.publishArticle(req.body));
    } catch {
      res.sendStatus(422);
    }
  }
);

router.post("/edit", (req, res) => {});

module.exports = router;
