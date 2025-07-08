const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import cors
require('dotenv').config(); // Simplified (no need to assign to `env`)

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const razorpayRoute = require('./routes/razorpay'); // ✅ Add this line


// ✅ Enable CORS middleware BEFORE your routes
app.use(cors({
  origin: "http://localhost:5173", // or "*" to allow all origins temporarily
  credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.use(express.json());

// ✅ Your routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", razorpayRoute); // ✅ Mount the Razorpay route


// ✅ Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
});
