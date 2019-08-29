const path = require("path");
const Datastore = require("nedb");
const storeArticles = new Datastore(
  path.join(__dirname, "../datastores/article.json")
);
// const storeArticles = new Datastores("../datastores/article.json");
const storeComments = new Datastore("../datastores/comment.json");
const validator = require("../validator/validator");

module.exports = class Database {
  static getArticles() {
    return new Promise((res, rej) => {
      storeArticles.find({}, (err, articles) => {
        if (err) {
          rej(err);
        } else {
          res(articles);
        }
      });
    });
  }

  static getArticlesRange(firstDate, lastDate) {
    return new Promise((res, rej) => {
      storeArticles.find(
        { date: { $gte: firstDate, $lte: lastDate } },
        (err, articles) => {
          if (err) {
            rej(err);
          } else {
            res(articles);
          }
        }
      );
    });
  }

  static publishArticle(dataDoc) {
    return new Promise((res, rej) => {
      storeArticles.insert({ hallo: "asdf" }, (err, article) => {
        console.log(article);
        res(article);
      });
    });
  }
};
