const express = require('express')
const router = express.Router();

const { getDashboardData, dashboard, getAdminDashboard , deleteUser } = require('../controllers/dashboard-controller')


router.route('/').get(getDashboardData).post(dashboard)
router.route('/admin').get(getAdminDashboard)
router.route('/delete').delete(deleteUser)


module.exports = router


