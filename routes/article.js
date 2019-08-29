const express = require("express");
const router = express.Router();
const validator = require("express-validator");
const database = require("../drivers/database");
const articleValidator = require("../middleware/articleValidator")

// just for debugging
router.get("/all", (req, res) => {});

router.get("/find", (req, res) => {});

router.get("/range", (req, res) => {});

router.post("/publish", articleValidator.validate(), (req, res) => {
    const err = validator.validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json({ errors: err.array() });
    }
    database.publishArticle(req.body)
      .then(article => res.send(article))
      .catch(err => res.sendStatus(422))
  }
);

router.post("/edit", (req, res) => {});

module.exports = router;
