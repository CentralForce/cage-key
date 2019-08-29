const Validator = require('jsonschema').Validator;

module.exports = class ArticleValidator {

    static validate(req, res, next) {
        if (req != null && req.body != null) {
            const validator = new Validator()

            const schemas = [
                require("./schemas/hashtagsSchema.json"),
                require("./schemas/urlsSchema.json")
            ].forEach(schema => validator.addSchema(schema, schema.id))
            schemas.forEach(schema => validator.addSchema(schema, schema.id));

            if (validator.validate(require("./schemas/articleSchema.json"), req.body)) {
                res.sendStatus(422)
            } else {
                req.body.createdAt = new Date()
                next(req, res)
            }
        } else {
            res.sendStatus(422)
        }
    }
    
}