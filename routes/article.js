/* eslint-disable new-cap */

const express = require('express');
const router = express.Router();
const dbArticle = require('../drivers/dbArticle');

router.get('/all', (req, res) => {
  dbArticle.all()
      .then((result) => res.send(result))
      .catch(() => res.sendStatus(422));
});

router.get('/find', (req, res) => {
  dbArticle.find(req.body.text)
      .then((result) => res.send(result))
      .catch(() => res.sendStatus(422));
});

router.get('/range', (req, res) => {
  dbArticle.range(parseInt(req.body.firstDate), parseInt(req.body.lastDate))
      .then((result) => res.send(result))
      .catch(() => res.sendStatus(422));
});

router.post('/publish', (req, res) => {
  dbArticle.publish(req.body)
      .then((result) => res.send(result))
      .catch(() => res.sendStatus(422));
});

router.post('/edit', (req, res) => {
  dbArticle.edit(req.body._id, req.body.data)
      .then((result) => res.send(result))
      .catch(() => res.sendStatus(422));
});

module.exports = router;
