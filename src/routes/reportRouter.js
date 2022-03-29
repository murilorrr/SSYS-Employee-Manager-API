const { Router } = require('express');
const { reportBySalary, reportByAge } = require('../controllers/reports');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.get('/employees/salary', authMiddleware, reportBySalary);
router.get('/employees/age', authMiddleware, reportByAge);

module.exports = router;
