const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Local Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/clothingStoreDB")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  categoryName: String,
  price: Number,
  originalPrice: Number,
  sizes: [String],
  image: String,
  description: String,
});
const Product = mongoose.model("Product", productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  email: String,
  address: String,
  items: Array,
  subtotal: Number,
  discount: Number,
  totalAmount: Number,
  shippingLocation: String,
  paymentMethod: String,
  bkashTrxId: String,
  status: { type: String, default: "Pending" }, // Pending, Processing, Delivered, Cancelled
  orderDate: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// Transporter for Email Notification
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // আপনার ইমেইল (ঐচ্ছিক)
    pass: "your-app-password",
  },
});

// Send Email Function
const sendEmailNotification = (toEmail, orderId, status) => {
  if (!toEmail) return;
  const mailOptions = {
    from: '"Threads & Co." <no-reply@threadsandco.com>',
    to: toEmail,
    subject: `Order Update #${orderId} - Threads & Co.`,
    text: `প্রিয় কাস্টমার, আপনার অর্ডারটির বর্তমান স্ট্যাটাস: ${status}। আমাদের সাথে থাকার জন্য ধন্যবাদ!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
      console.log("Email Notification Error (Simulated):", error.message);
    else console.log("Email sent:", info.response);
  });
};

// --- PRODUCTS API ROUTES ---
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- ORDERS API ROUTES ---
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // Send Order Confirmation Email
    sendEmailNotification(newOrder.email, newOrder._id, "Received & Pending");

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    // Send Status Change Email
    if (updatedOrder) {
      sendEmailNotification(updatedOrder.email, updatedOrder._id, status);
    }

    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
