const express = require("express");
const cors = require("cors");
const clerkWebhooks = require("./controllers/clerkWebhooks.js");

const app = express();

app.use(cors());
app.use(express.json());

//Api to listen to Clerk Webhooks.

app.post("/api/clerk", 
  express.raw({ type: "application/json" }), clerkWebhooks);
// Default route
app.get("/", (req, res) => {
  res.send("Backend API Working ✅");
  
});



module.exports = app;
