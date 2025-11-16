const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const clerkWebhooks = require("./controllers/clerkWebhooks");

const app = express();

app.use(cors());

// ⚠️ Webhook route sabse upar hoga aur RAW body lega
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// ⚠️ Raw ke baad hi JSON parser
app.use(express.json());

// Clerk Middleware
app.use(clerkMiddleware());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend API Working ✅");
});

module.exports = app;
