const Joi = require("joi");

const schemaValidator = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,24}$/))
    .required(),
  password_repeat: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "org", "net"] },
    })
    .required(),
}).with("password", "password_repeat");

module.exports = schemaValidator;
