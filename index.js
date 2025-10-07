const express = require('express')
const app = express();
const path = require("path")
const userLoginSchema = require("./models/userModel")
const multer = require("multer");
const dotenv = require('dotenv');
// const cors = require(cors);
const { dbConnection } = require('./config/seqlizeConnection')
const User = require('./models/sqlUserModel')
const port = process.env.PORT || 3500;

// disk design kar de
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // custom file name
    }
});

User.sync()

dotenv.config()
// accesss karo storage in multer
const upload = multer({ storage: storage });

const cookieParse = require('cookie-parser');


// Without this, req.body would be undefined when you send JSON from client.
app.use(express.json());
// app.use(express.cors);
// This is the format when you submit HTML <form> data.
app.use(express.urlencoded({ extended: true }))
// It’s built-in middleware in Express that serves static files (images, CSS, JavaScript, PDFs, etc.) from a directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParse())


app.set('view engine', 'ejs')



app.get('/staticPage', (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("avatar"), (req, res) => {
    console.log(req.file);  // uploaded file details
    // console.log(req.body);  // text fields
    res.send("File uploaded!");
});


app.use('/api/dashbaord', require('./routing/dashbaordRoute'));
app.use('/api', require('./routing/loginRoute'))

app.post('/createuser', async function (req, res) {
    let user = await userLoginSchema.create({
        power_type: "kjasbck",
        name: "ashok",
        mana_power: 23,
        health: 89,
        gold: 79
    })

    res.send(user)
})







app.listen(port, () => {
    console.log('server is started')
    dbConnection()
})