const Validator = require('jsonschema').Validator;

module.exports = function isTimerange(req, res, next) {
  if (req != null && req.body != null) {
    const validator = new Validator()
    const result = validator.validate(req.body, require("./schemas/rangeSchema.json"))
    if (result != null && result.errors != null && result.errors.length <= 0) {
      next()
    } else {
      res.sendStatus(422)
    }
  } else {
    res.sendStatus(422)
  }
}