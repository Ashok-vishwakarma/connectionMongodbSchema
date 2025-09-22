const express = require('express')
const app = express();
const path = require("path")

const cookieParse = require('cookie-parser');


// Without this, req.body would be undefined when you send JSON from client.
app.use(express.json());
// This is the format when you submit HTML <form> data.
app.use(express.urlencoded({ extended: true }))
// It’s built-in middleware in Express that serves static files (images, CSS, JavaScript, PDFs, etc.) from a directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParse())


app.set('view engine', 'ejs')



app.get('/staticPage', (req, res) => {
    res.render("index")
})


app.use('/api/dashbaord', require('./routing/dashbaordRoute'));
app.use('/api', require('./routing/loginRoute'))







app.listen(2525)