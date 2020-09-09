'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/healthchecks');

router.get('/', controller.healthchecks);
router.post('/', controller.verifyAuth);

module.exports = router;
