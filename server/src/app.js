const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require('@clerk/express');
const clerkWebhooks = require("./controllers/clerkWebhooks.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

//Api to listen to Clerk Webhooks.

app.post("/api/clerk",clerkWebhooks);
// Default route
app.get("/", (req, res) => {
  res.send("Backend API Working ✅");
  
});



module.exports = app;
