require("dotenv").config();
const express = require("express");
const config = require("./config");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
// WhatsApp webhook — this URL goes into Meta Developer Dashboard → Webhook
app.use("/webhook", require("./routes/webhook"));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`[Server] Running on port ${config.port}`);
  console.log(`[Server] Webhook URL: http://your-domain.com/webhook`);
  console.log(`[Server] Health:      http://localhost:${config.port}/health`);
});
