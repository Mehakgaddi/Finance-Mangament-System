const mongoose = require("mongoose");
require("dotenv").config();

// Prefer environment variable for credentials to avoid committing secrets
const MongoDB_URI = process.env.MONGODB_URI;

if (!MongoDB_URI) {
  console.warn(
    "Warning: MONGODB_URI is not set. Set it in your environment or add a .env file. Example in .env.example"
  );
}

// Connect and add basic error handling
if (MongoDB_URI) {
  mongoose
    .connect(MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Mongo DB connection successful!"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));
} else {
  console.warn(
    "⚠️  No MONGODB_URI provided. Running in demo mode. Database features will not work."
  );
}

const connection = mongoose.connection;

connection.on("disconnected", () => console.warn("MongoDB disconnected"));
connection.on("error", (err) => console.error("MongoDB error:", err));

module.exports = connection;
