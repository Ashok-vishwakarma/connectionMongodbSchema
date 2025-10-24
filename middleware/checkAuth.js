const jwt = require("jsonwebtoken");
const saltJwt = "qkbsdcswertyuiopasdfghjkl";
const { userToken } = require('../models/userToken')


const checkAuth = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(402).send("Token is not there")
        }

        const userDetails = jwt.verify(token, saltJwt)
        if (userDetails) {
            // user is eligiable for amdin page of not check using roll
            next()
        } else {
            userToken.destroy({
                where: {
                    userId: userDetails.data.data
                }
            })
        }
        // res.send({ data: userDetails })
        // console.log(userDetails + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")

    } catch (error) {
        userToken.destroy({
            where: {
                tokenNumber: req.headers.authorization.split(" ")[1]
            }
        })
        res.send(error)
    }
}


module.exports = checkAuth