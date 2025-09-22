const express = require('express')
const router = express.Router();

const { getDashboardData, dashboard } = require('../controllers/dashboard-controller')


router.route('/').get(getDashboardData).post(dashboard)


module.exports = router


