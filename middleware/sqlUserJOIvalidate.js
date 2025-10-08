const joi = require('joi')

const UserValidateByJoi = joi.object({
    email: joi.string().email().required(),
    firstName: joi.string().alphanum().max(30).required(),
    lastName: joi.string().alphanum().max(30).required()
})

module.exports = { UserValidateByJoi }