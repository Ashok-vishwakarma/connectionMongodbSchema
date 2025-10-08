const { insertOperation, allUserRecord, getByIdUserData
    , updateUserByIdUserData, deleteUserByIdUserData } = require('../controllers/sqlquerytest')
const express = require('express')
const router = express()

router.route('/').post(insertOperation)
router.route('/findAllData').get(allUserRecord)
router.route('/:id').get(getByIdUserData)
router.route('/update/:id').get(updateUserByIdUserData)
router.route('/delete/:id').get(deleteUserByIdUserData)
// router.route('/').get(insertOperation)


module.exports = router