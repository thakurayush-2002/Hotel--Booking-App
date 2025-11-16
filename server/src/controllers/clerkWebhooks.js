const { Webhook } = require("svix");
const userModel = require("../models/userModel");
require("dotenv").config();

const clerkWebhooks = async (req, res) => {
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(req.body, req.headers);
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  console.log("🔔 Clerk Event:", evt.type);

  if (evt.type === "user.created") {
    const user = evt.data;

    // Email safe extraction / fallback
    let email = user?.email_addresses?.[0]?.email_address || `${user.id}@dummy.com`;
    if (!user?.email_addresses?.[0]?.email_address) {
      console.warn("⚠ Email missing. Using dummy email:", email);
    }

    try {
      // Duplicate check
      const existingUser = await userModel.findById(user.id);
      if (!existingUser) {
        await userModel.create({
          _id: user.id,
          username: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          email,
          image: user.image_url,
          role: "user",
          recentSearchedCities: [],
        });
        console.log("✅ User Saved:", email);
      } else {
        console.log("ℹ User already exists:", email);
      }
    } catch (err) {
      console.error("❌ DB Error:", err.message);
    }
  }

  res.status(200).json({ success: true });
};

module.exports = clerkWebhooks;
