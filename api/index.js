require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


const app = express();
 connectDB();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth',authRoutes
);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
// app.post('/api/payment/verify', ((req, res) => {
  
//   console.log("bghrg")
//   console.log(req.body, "<--------- Full Request Body");
//   const { signature, orderId, paymentId } = req.body;
//   console.log(signature, orderId, paymentId)
//   if (!signature || !orderId || !paymentId) {
//     return res.status(400).send('Missing required fields');
//   }
// }));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' }); 
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
