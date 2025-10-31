const userModel = require("../models/userModel.js");
const { Webhook } = require("svix");

const clerkWebhooks = async (req, res) => {
  try {
    // Create Svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Clerk webhook payload (stringify, not toString)
    const payload = req.body;

    // Get headers from Clerk webhook request
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook signature
    const evt = whook.verify(payload, headers);

    // Extract data and type
    const { data, type } = evt;

    // Prepare user data
    const userData = {
  _id: data.id,
  email: data.email_addresses?.[0]?.email_address || "no-email@clerkuser.com",
  username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
  image: data.image_url || data.profile_image_url || "",
};

    // Handle different event types
    switch (type) {
      case "user.created":
        await userModel.create(userData);
        console.log("✅ User created:", userData.email);
        break;

      case "user.updated":
        await userModel.findByIdAndUpdate(data.id, userData);
        console.log("🔁 User updated:", userData.email);
        break;

      case "user.deleted":
        await userModel.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        break;

      default:
        console.log("⚠️ Unhandled event type:", type);
        break;
    }

    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = clerkWebhooks;
