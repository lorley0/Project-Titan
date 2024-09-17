const express = require('express');
const { getUsers, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, getUsers);
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;
