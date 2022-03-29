const { Router } = require('express');
const { reportBySalary } = require('../controllers/reports');

const router = new Router();

router.get('/employees/salary', reportBySalary);

module.exports = router;
