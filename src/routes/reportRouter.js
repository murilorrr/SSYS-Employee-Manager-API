const { Router } = require('express');
const { reportBySalary, reportByAge } = require('../controllers/reports');

const router = new Router();

router.get('/employees/salary', reportBySalary);
router.get('/employees/age', reportByAge);

module.exports = router;
