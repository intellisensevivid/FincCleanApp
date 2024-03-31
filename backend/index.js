const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const seedRoles = require("./seeders/seedRoles");

connectDB();

app.use(
  cors({
    origin: [
      "https://laundromat.eduos.com.ng",
      "http://localhost:5173",
      "https://fincclean.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to FincCleanApp, your favorite laundry management system");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
// batch B of dev
app.use("/api/shift", require("./routes/shiftRoute"));
app.use("/api/payroll", require("./routes/payrollRoute"));
app.use("/api/attendance", require("./routes/attendanceRoute"));
app.use("/api/pickup", require("./routes/pickupRoute"));
app.use("/api/delivery", require("./routes/deliveryRoute"));
app.use("/api/user", require("./routes/permission"));
app.use("/api/store", require("./routes/storeRoute"));

app.use(errorHandler);

app.use("*", (req, res) => {
  res.send("<h1>ROUTE NOT FOUND</h1>");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
