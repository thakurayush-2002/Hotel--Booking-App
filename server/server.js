const dotenv = require("dotenv");
const app = require("../server/src/app");
const connectDB = require("./src/configs/db");
//const { clerkMiddleware } = require('@clerk/express');


dotenv.config();
connectDB();

//app.use(clerkMiddleware());
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
