const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/configs/db");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
