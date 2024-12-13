const Payment = require('../models/Payment');
const Razorpay = require('razorpay')
const crypto = require('crypto')
const bodyParser = require('body-parser');

const razorpay = new Razorpay({
  key_id: 'rzp_test_tJUtJdrFjgX8wI',
     key_secret: 'edtghu6tju7koi68uko89'
})
 
exports.order = async (req, res) => {
  const { keySecret, keyId, amount, } = req.body;

  if (!keySecret || !keyId || !amount ) {
    return res.status(400).json({ error: "Missing required fields" });
  }


  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };
  console.log("Creating order with options:", options);

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(400).json({ error: err.error.description || "Unable to create order. Please try again." });
  }
};




exports.verify = (req, res) => {
  const secret_key = 'edtghu6tju7koi68uko89';
  const { signature, orderId, paymentId } = req.body.orderDetails;
  if (!signature) {
    return res.status(400).send('Missing signature');
  }

  const generatedSignature = crypto
    .createHmac('sha256', secret_key)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  if (generatedSignature === signature) {
    console.log('Request is legit');
    return res.json({ status: 'ok' });
  } else {
    console.error('Invalid signature');
    return res.status(400).send('Invalid signature');
  }
};


exports.refund= async (req, res) => {

  try {

      //Verify the payment Id first, then access the Razorpay API.

      const options = {

          payment_id: req.body.paymentId,

          amount: req.body.amount,

      };

const razorpayResponse = await razorpay.refund(options);

      //We can send the response and store information in a database

      res.send('Successfully refunded')

  } catch (error) {

      console.log(error);

      res.status(400).send('unable to issue a refund');

  }

}