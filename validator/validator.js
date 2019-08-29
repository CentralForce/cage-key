const Validator = require("jsonschema").Validator;

const articleSchema = {
  properties: {
    createdAt: { type: "date" },
    text: { type: "string" },
    entities: {
      hashtags: { type: "array", $ref: "hashtagSchema" },
      urls: { $ref: "urlsSchema" }
    }
  },
  required: ["createdAt", "text", "entities"]
};

/**
 * createdAt: date,
 * text: "",
 * entities: {
 *   hashtags: [
 *     {
 *       position: 0,
 *       length: 5
 *     }
 *   ],
 *   urls: [
 *     {
 *       position: 0,
 *       length: 5,
 *       href: "https://www.youtube.de"
 *     }
 *   ]
 * }
 */
module.exports = class Validator {
  static article(article) {
    const v = new Validator();
    v.addSchema(
      {
        id: "urlsSchema",
        type: "object",
        properties: {
          position: { type: "integer" },
          length: { type: "integer" },
          href: { type: "string" }
        },
        require: ["position", "length", "href"]
      },
      "urlsSchema"
    );
    v.addSchema(
      {
        id: "hashtagSchema",
        type: "object",
        properties: {
          position: { type: "integer" },
          length: { type: "integer" }
        },
        require: ["position", "length"]
      },
      "hashtagSchema"
    );
    return v.validate(article, articleSchema);
  }
};
