const express = require('express');
const router = express.Router();
const { handleCall } = require('../controllers/vxmlController');

router.post('/agi', handleCall);

module.exports = router;
