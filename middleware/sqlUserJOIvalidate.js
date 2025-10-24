const joi = require('joi')
// create JOI always in   validator
const UserValidateByJoi = joi.object({
    email: joi.string().email().required(),
    firstName: joi.string().alphanum().max(30).required(),
    lastName: joi.string().alphanum().max(30).required()
})

module.exports = { UserValidateByJoi }