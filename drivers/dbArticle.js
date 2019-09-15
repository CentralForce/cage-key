const path = require('path');
const Datastore = require('nedb');
const store = new Datastore({filename: path.join(__dirname,
    '../datastores/article.json'), autoload: true});

module.exports = class {
  /**
   * @async
   * @return {Promise<Array.<Object>>} All articles
   */
  static all() {
    return new Promise((resolve, reject) => {
      store.find({}, (err, articles) => {
        if (err) reject(err);
        else resolve(articles);
      });
    });
  }

  /**
   * Find articles in a timerange
   * Timerange: articleDate >= fDate AND articleDate <= lDate
   * @async
   * @param {number} fDate First date included in timerange
   * (e.g.  927331200000 -> May 22, 1999 12:00:00 AM)
   * @param {number} lDate Most recent date included in timerange
   * (e.g. 1546300800000 -> January 1, 2019 12:00:00 AM)
   * @return {Promise<Array.<Object>>} Articles in a given timerange
   */
  static range(fDate, lDate) {
    return new Promise((resolve, reject) => {
      store.find({createdAt: {$gte: fDate, $lte: lDate}}, (err, articles) => {
        if (err) {
          reject(err);
        } else {
          resolve(articles);
        }
      });
    });
  }

  /**
   * Update an existing article
   * @async
   * @param {string} _id Unique id of an article
   * @param {Object} articleData Article data
   * @return {Promise} Edited article
   */
  static edit(_id, articleData) {
    return new Promise((resolve, reject) => {
      store.update({_id}, {$set: articleData}, {}, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  /**
   * Create a new article
   * @async
   * @param {Object} articleData Article data
   * @return {Promise<Object>} New article
   */
  static publish(articleData) {
    return new Promise((resolve, reject) => {
      articleData.createdAt = new Date().getTime();
      store.insert(articleData, (err, article) => {
        if (err) reject(err);
        else resolve(article);
      });
    });
  }

  /**
   * Find articles by the given texts
   * @async
   * @param {Array.<string>} texts The texts to match
   * @return {Promise<Array.<Object>>} Articles found
   */
  static find(texts) {
    return new Promise((resolve, reject) => {
      const buzzwords = texts
          .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join('|');
      const $regex = new RegExp('\\b(\\w*(' + buzzwords + ')\\w*)\\b', 'g');
      store.find({text: {$regex}}, (err, articles) => {
        if (err) reject(err);
        else resolve(articles);
      });
    });
  }

  /**
   * Find article by the given id
   * @param {string} _id Id to find article
   * @return {Promise<Object>} Article found
   */
  static id(_id) {
    return new Promise((resolve, reject) => {
      store.findOne({_id}, (err, article) => {
        if (err) reject(err);
        else resolve(article);
      });
    });
  }
};
