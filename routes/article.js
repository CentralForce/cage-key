const express = require("express");
const router = express.Router();
const database = require("../drivers/database");
const { body } = require("express-validator")

// validation
const isArticle = require("../middlewares/isArticle");
const isRange = require("../middlewares/isRange")

// just for debugging
router.get("/all", (req, res) => {
  database.getArticles()
    .then(result => res.send(result))
    .catch(err => res.sendStatus(422))
});

router.get("/find", isRange, (req, res) => { });

router.get("/range", (req, res) => {
  database.getArticlesRange(req.body.firstDate, req.body.lastDate)
    .then(result => res.send(result))
    .catch(err => res.sendStatus(422))
});

router.post("/publish", isArticle, (req, res) => {
  database.publishArticle(req.body)
    .then(result => res.send(result))
    .catch(err => res.sendStatus(422))
});

router.post("/edit", (req, res) => { });

module.exports = router;
