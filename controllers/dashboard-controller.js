// const errorAsyncHandler = require('express-async-handler');
// var errorHandler = require('express-error-handler'),
//     handler = errorHandler({
//         handlers: {
//             '404': function err404() {
//                 // do some custom thing here...
//             }
//         }
//     });

const cookieParser = require("cookie-parser");


//@Get


const getDashboardData = (req, res, next) => {
    // const data = req.body
    res.cookie('name', 'kjagsicbauigas')
    res.send("Data received successfully GET DATA");
}


const dashboard = async (req, res, next) => {
    const payloadData = await req.body
    console.log(req.cookies, "cokiesssssssss")
    // console.log(payloadData)
    payloadData.forEach((res, index) => {
        console.log(res, index)
    });
    res.send("Data received successfully");
}

const getAdminDashboard = (req, res) => {
    res.send("admin Data")
}

const deleteUser = (req , res) => {
    const userId= req.params.id;
    //your query

    res.status(200).send('user deleted sucessfully' + userId)
}



module.exports = { dashboard, getDashboardData, getAdminDashboard, deleteUser }