const path = require("path");
const Datastore = require("nedb");
const storeComments = new Datastore({ filename: path.join(__dirname, "../datastores/comment.json"), autoload: true });
const storeArticles = new Datastore({ filename: path.join(__dirname, "../datastores/article.json"), autoload: true });

class Database {
  getArticles() {
    return new Promise((res, rej) => {
      storeArticles.find({}, (err, articles) => {
        if (err) {
          rej(err)
        } else {
          res(articles)
        }
      })
    })
  }

  getArticlesRange(firstDate, lastDate) { }

  publishArticle(articleData) {
    return new Promise((res, rej) => {
      storeArticles.insert(articleData, (err, article) => {
        if (err) {
          rej(err)
        } else {
          res(article)
        }
      });
    })
  }

  findArticle(articleText) {
    return new Promise((res, rej) => {
      storeArticles.find({}, (err, articles) => {
        if (err) {
          rej(err)
        } else {
          res(articles)
        }
      })
    })
  }

};

module.exports = new Database()