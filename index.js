const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const mongoConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

app.use("/", authRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoConnect();
});
