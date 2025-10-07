const mongoose = require('mongoose');
const URLs = "mongodb://localhost:27017/datatata"
// const URLs = "mongodb://localhost:27017/"
mongoose.connect(URLs).then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

const userLoginSchema = mongoose.Schema({
    //if we have to make require then mentin like this else mention like mana_power

    name: {
        type: String,
        require: true
    },
    power_type: {
        type: String,
        require: true
    },
    mana_power: Number,
    health: Number,
    gold: Number,

}, {
    timestamps: true,
    // collection: 'userLogin'  // <-- Set custom collection name
})

module.exports = mongoose.model("userLoginSchema", userLoginSchema)
