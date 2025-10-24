const express = require('express')
const app = express();
const path = require("path")
const userLoginSchema = require("./models/userModel")
const multer = require("multer");
const dotenv = require('dotenv');
const cors = require(cors);
const { dbConnection } = require('./config/seqlizeConnection')
const User = require('./models/sqlUserModel')
const userToken = require('./models/userToken');
const { userIdCreation } = require('./models/userIdCreation');
const { sequelize } = require('./config/seqlizeConnection')
const port = process.env.PORT || 2525;
const checkAuth = require('./middleware/checkAuth');
const { errorLogger } = require('./utlis/errorMiddleware');
const cluster = require('cluster');
const os = require('os')
const cpuLength = os.cpus().length

// disk design kar de
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // custom file name
    }
});

// User.sync({ force: false })
// userIdCreation.sync({ force: true })
// userToken.sync()
//       or
sequelize.sync()

var whitelist = ['http://localhost:3000', 'http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}



dotenv.config()
// accesss karo storage in multer
const upload = multer({ storage: storage });

const cookieParse = require('cookie-parser');
const { error } = require('console');
const { or } = require('sequelize');


// Without this, req.body would be undefined when you send JSON from client.
app.use(express.json());
app.use(cors(corsOptions));
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


app.use('/api/dashbaord', checkAuth, require('./routing/dashbaordRoute'));
app.use('/api', require('./routing/loginRoute'))
// sql model code how i can insert value from in sqlDB
app.use('/sqlModelCheck', require('./routing/sqlQuerytest'))
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

app.get('/error-logCheck', async (req, res, next) => {
    try {
        const dummyapiCALL = await fakeDatabaseCall();
        res.json({ data: result });
    } catch (err) {
        next(err)
        // throw Error();
    }
})
app.use(errorLogger)




if (cluster.isPrimary) {
    console.log(`port id is - ${process.pid} - ${cpuLength}  ////////////////////////`);

    for (let i = 0; i < cpuLength; i++) {
        console.log(`fork ${process.pid} ???????????????????????????????`);
        cluster.fork();
    }
} else {
    app.listen(port, () => {
        console.log('server is started', `${port}`)
        dbConnection()
    })
}




