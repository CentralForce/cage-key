const Validator = require('jsonschema').Validator;

module.exports = function isArticle(req, res, next) {
    if (req != null && req.body != null) {
        const validator = new Validator()
        const schemas = [
            require("./schemas/hashtagsSchema.json"),
            require("./schemas/urlsSchema.json")
        ]
        schemas.forEach(schema => validator.addSchema(schema, schema.id));
        const result = validator.validate(req.body, require("./schemas/articleSchema.json"))
        console.log(result.errors)
        if (result != null && result.errors != null && result.errors.length <= 0) {
            req.body.createdAt = new Date()
            next()
        } else {
            res.sendStatus(422)
        }
    } else {
        res.sendStatus(422)
    }
}