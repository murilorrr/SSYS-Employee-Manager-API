const { Router } = require('express');
const { create } = require('../controllers/employees');

const router = new Router();

router.post('/', create);

module.exports = router;
