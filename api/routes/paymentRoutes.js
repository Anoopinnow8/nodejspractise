const express = require('express');
const { order, verify ,refund} = require('../controllers/paymentController');

const router = express.Router();

router.post('/order',  order);
router.post('/verify', verify);
router.post('/refund',  refund);


module.exports = router;
