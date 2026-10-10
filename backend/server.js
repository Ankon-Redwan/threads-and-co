const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Local Connection String (শুরুতে লোকাল ডাটাবেজে টেস্ট করার জন্য)
const MONGO_URI = "mongodb://127.0.0.1:27017/clothing_store";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Database Connected Successfully!"))
  .catch((err) =>
    console.log("⚠️ MongoDB Local DB error (It is okay for now):", err.message),
  );

// Order Schema (অর্ডারের তথ্যের ফরম্যাট)
const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: Array,
  totalAmount: Number,
  shippingLocation: String,
  paymentMethod: String,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// API Route 1: টেস্ট রুট
app.get("/", (req, res) => {
  res.send("Clothing Store Backend API is Running!");
});

// API Route 2: কাস্টমারের নতুন অর্ডার গ্রহণ
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "অর্ডার সফলভাবে সেভ হয়েছে!",
      orderId: newOrder._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "অর্ডার সেভ করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
});

// API Route 3: সব অর্ডারের তালিকা (অ্যাডমিন ড্যাশবোর্ডের জন্য)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
