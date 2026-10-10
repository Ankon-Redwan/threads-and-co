const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "threads_co_secret_key_2026";

// MongoDB Local Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/clothingStoreDB")
  .then(() => {
    console.log("MongoDB Connected Successfully");
    createInitialAdmin();
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, default: "Admin" },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "01700000000" },
  password: { type: String, required: true },
});
const Admin = mongoose.model("Admin", adminSchema);

// Initial Super Admin Creation Function
const createInitialAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({
      email: "admin@threadsandco.com",
    });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await Admin.create({
        name: "Threads Admin",
        email: "admin@threadsandco.com",
        phone: "01700000000",
        password: hashedPassword,
      });
      console.log(
        "Default Admin Account Created: admin@threadsandco.com / admin123",
      );
    }
  } catch (err) {
    console.error("Admin seeding error:", err);
  }
};

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
  status: { type: String, default: "Pending" },
  orderDate: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// Email Notification Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "support@threadsandco.com",
    pass: "app-password-here",
  },
});

const sendEmailNotification = (toEmail, orderId, status) => {
  if (!toEmail) return;
  const mailOptions = {
    from: '"Threads & Co." <no-reply@threadsandco.com>',
    to: toEmail,
    subject: `Order Update #${orderId} - Threads & Co.`,
    text: `Prio Customer, apnar order-er bortoman status: ${status}. Amader sathe thakar jonno dhonnobad!`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) console.log("Email Notification Simulated.");
  });
};

// --- AUTH / ADMIN API ROUTES ---

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;
  try {
    const admin = await Admin.findOne();
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "Admin account paowa jayni!" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Bhul password! Abar chesta korun." });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      success: true,
      token,
      admin: { name: admin.name, email: admin.email, phone: admin.phone },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin Profile Fetch Route
app.get("/api/admin/profile", async (req, res) => {
  try {
    const admin = await Admin.findOne().select("-password");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Account Settings Update Route (Name, Email, Phone, Password Change)
app.put("/api/admin/profile", async (req, res) => {
  const { name, email, phone, currentPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findOne();
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin paowa jayni" });

    // Confirm Current Password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Bortoman password bhul!" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;

    if (newPassword && newPassword.trim() !== "") {
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    res.json({
      success: true,
      message: "Admin profile shofolbhabe update hoyeche!",
      admin: { name: admin.name, email: admin.email, phone: admin.phone },
    });
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
    if (updatedOrder)
      sendEmailNotification(updatedOrder.email, updatedOrder._id, status);
    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
