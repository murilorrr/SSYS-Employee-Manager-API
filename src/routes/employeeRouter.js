const { Router } = require('express');
const { create, getAll, login, getById, updateOne, deleteOne } = require('../controllers/employees');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post('/', create);
router.get('/', authMiddleware, getAll);
router.get('/:id', authMiddleware, getById);
router.put('/:id', authMiddleware, updateOne);
router.delete('/:id', authMiddleware, deleteOne);
router.post('/login', login);

module.exports = router;
