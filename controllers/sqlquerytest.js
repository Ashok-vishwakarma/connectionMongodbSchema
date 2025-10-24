const User = require('../models/sqlUserModel');
const { Op } = require('sequelize');
const { UserValidateByJoi } = require('../middleware/sqlUserJOIvalidate');



const insertOperation = async (req, res) => {
    const { error } = UserValidateByJoi.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    // const insertdata = User.build({
    //     email: 'abc@gmail.com',
    //     firstName: 'ashok',
    //     lastName: 'vishwakarma'
    // })

    // await insertdata.save();

    // or- hey have two method to create/insert data in database


    // const insertdata = await User.create({
    //     email: 'sharma@gmail.com',
    //     firstName: 'Shivam ',
    //     lastName: 'Sharma'
    // })
    const insertdata = await User.create(req.body)

    res.status(201).send({ message: `${insertdata.firstName} is created sucessfully` })

}


const allUserRecord = async (req, res) => {
    // select * form User
    const alluserRecords = await User.findAll();

    // select firstname , lastname from User use below query
    // User.findAll({ attributes: ['foo', 'bar'] });

    res.status(201).send(alluserRecords)
}

const getByIdUserData = async (req, res) => {

    const id = req.params.id
    const userById = await User.findAll({
        where: { id: id },
    });

    console.log(userById + "getttttByyy ID")


    res.status(201).send(userById)

}


const updateUserByIdUserData = async (req, res) => {
    const userId = req.params.id
    // const userUpdated = User.update({"firstName":"Sham"} , {where : {id:}})
    const userUpdated = await User.update(req.body, { where: { id: userId } })

    res.status(201).send(`id:- ${userId} is updated successfully`)

}

const deleteUserByIdUserData = async (req, res) => {
    const userId = req.params.id
    const deletedCount = await User.destroy({
        where: { id: userId }, // or just { id }
    });

    if (deletedCount) {
        res.status(201).send({ message: `${userId} UserId Is Deleted` })
    }
}


module.exports = { insertOperation, allUserRecord, getByIdUserData, updateUserByIdUserData, deleteUserByIdUserData }