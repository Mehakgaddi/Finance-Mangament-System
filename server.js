require("dotenv").config();
const express = require("express");
const cors = require("cors");

// require the DB connection (it will attempt to connect on import)
const dbConnect = require("./dbConnect");
const app = express();
app.use(cors());
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");

app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionsRoute);
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log("Node JS server started at port: " + port)
);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Kill the process using this port or set PORT env var.`
    );
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});

module.exports = app;
