require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./src/db/dbConnect");
const User = require("./src/db/userModel");
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/auth", require("./src/routes/authRoutes"));
app.use("/v1/locations", require("./src/routes/locationRoutes"));
app.use("/v1/products", require("./src/routes/productsRoutes"));
app.use("/v1/storages", require("./src/routes/storageRoutes"));

async function checkAndCreateAdminUser() {
  try {
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      bcrypt.hash("admin", 10).then(async (hashedPassword) => {
        const user = new User({
          email: "admin@admin.com",
          password: hashedPassword,
          roles: ["operator", "observer"],
        });

        await user.save();
      });
    }
  } catch (error) {
    console.error("Error verifying and creating admin user:", error);
  }
}

// Execute the method to check and create the administrator user when starting the application
checkAndCreateAdminUser();
module.exports = app;
