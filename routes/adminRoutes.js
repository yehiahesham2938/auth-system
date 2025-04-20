const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { updateUserRole } = require('../controllers/adminController');

const router = express.Router();

router.use(authenticate);
router.use(authorize(['admin']));

router.put('/users/:id/role', updateUserRole);

module.exports = router;