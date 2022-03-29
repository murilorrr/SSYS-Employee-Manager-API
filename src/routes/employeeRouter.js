const { Router } = require('express');
const { create, getAll, login } = require('../controllers/employees');

const router = new Router();

router.post('/', create);
router.get('/', getAll);
router.post('/login', login);

module.exports = router;
