const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { userIdCreation } = require('../models/userIdCreation')
const { userToken } = require('../models/userToken')

const salt = "qwertyuiopasdfghjkl";
const saltJwt = "qkbsdcswertyuiopasdfghjkl";
let arrPassword = [{
    username: 'Ashok@255',
    password: '$2b$10$zIQs0o0XW4rjcoovdj08nOoeyCgm1hB1SuV3iAsIWEpNqedaaJLDC',
    email: "ashok@gmail.com"
}]

const login = async (req, res) => {
    try {
        const { username, password, email } = req.body
        if (username && password && email) {

            //  const userHashPass = arrPassword.find(u => u.username === username);
            // statis 
            // const userHashPass = arrPassword.map((res) => {
            //     if (username == res.username) {
            //         return res
            //     }
            // })


            // DYNAMIC  FROM DB CALL
            const token = await userIdCreation.findOne({ where: { email: email } })

            //DECRYP THE PASSWORD AND SAVE IN DB
            bcrypt.compare(password, token.password, function (err, result) {
                result == true ? jwtCreation(email, res) : res.send("User is not Authenticate")
            });

        } else {
            res.status(403).send("all feilds required");
        }
    } catch (err) {
        throw new Error(err)
    }
}

async function jwtCreation(emailId, response) {

    const jwtToken = jwt.sign({
        data: emailId
    }, saltJwt, { expiresIn: '2m' });


    await userToken.create({ userId: emailId, tokenNumber: jwtToken })


    response.send({
        "token": jwtToken,
        "message": "Userlogin successfully"
    },)
}

const signUp = (req, res) => {
    try {
        const { username, password, email } = req.body
        if (username && password && email) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    console.log({ "username": username, password: hash });
                    arrPassword.push({ "username": username, password: hash })
                    const userCreat = userIdCreation.create({ username, password: hash, email })
                    res.send('signUp successfullly', userCreat.username)
                });
            });
        } else {
            return res.status(403).send("all feilds required");
        }
    } catch (err) {
        throw new Error(err)
    }
}




module.exports = { login, signUp }