const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const salt = "qwertyuiopasdfghjkl";
const saltJwt = "qkbsdcswertyuiopasdfghjkl";
let arrPassword = [{
    username: 'Ashok@255',
    password: '$2b$10$zIQs0o0XW4rjcoovdj08nOoeyCgm1hB1SuV3iAsIWEpNqedaaJLDC',
    email: "ashok@gmail.com"
}]

const login = (req, res) => {
    try {
        const { username, password, email } = req.body
        if (username && password && email) {

            //  const userHashPass = arrPassword.find(u => u.username === username);

            const userHashPass = arrPassword.map((res) => {
                if (username == res.username) {
                    return res
                }
            })

            //DECRYP THE PASSWORD AND SAVE IN DB
            bcrypt.compare(password, userHashPass[0].password, function (err, result) {
                result == true ? jwtCreation(email , res) : res.send("User is not Authenticate")
            });

        } else {
            res.status(403).send("all feilds required");
        }
    } catch (err) {
        throw new Error(err)
    }
}

function jwtCreation(emailId , response) {

    const jwtToken = jwt.sign({
        data: emailId
    }, saltJwt, { expiresIn: '1h' });

    response.send({
        "token": jwtToken,
        "message": "Userlogin successfully"
    })
}

const signUp = (req, res) => {

    try {
        const { username, password, email } = req.body
        if (username && password && email) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    console.log({ "username": username, password: hash });
                    arrPassword.push({ "username": username, password: hash })
                });
            });
            res.send('signUp successfullly')
        } else {
            return res.status(403).send("all feilds required");
        }
    } catch (err) {
        throw new Error(err)
    }
}




module.exports = { login, signUp }