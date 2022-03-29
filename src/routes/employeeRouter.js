const { Router } = require('express');
const { create, getAll, login } = require('../controllers/employees');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post('/', create);
router.get('/', authMiddleware, getAll);
router.post('/login', login);

module.exports = router;
