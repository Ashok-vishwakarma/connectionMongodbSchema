const { insertOperation, allUserRecord, getByIdUserData
    , updateUserByIdUserData, deleteUserByIdUserData } = require('../controllers/sqlquerytest')
const express = require('express')
const router = express()

router.route('/').post(insertOperation)
router.route('/findAllData').get(allUserRecord)
router.route('/:id').get(getByIdUserData)
router.route('/update/:id').put(updateUserByIdUserData)
router.route('/deleteSingleUser/:id').delete(deleteUserByIdUserData)
// router.route('/').get(insertOperation)


module.exports = router