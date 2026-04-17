const config = require("../config");
const messageHandler = require("../handlers/messageHandler");

/**
 * GET /webhook
 * Meta calls this to verify your webhook URL.
 * Set the same WHATSAPP_VERIFY_TOKEN in your .env and in the Meta Developer Dashboard.
 */
function verifyWebhook(req, res) {
  const mode      = req.query["hub.mode"];
  const token     = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.whatsapp.verifyToken) {
    console.log("[Webhook] Verified successfully.");
    return res.status(200).send(challenge);
  }

  console.warn("[Webhook] Verification failed — token mismatch or wrong mode.");
  return res.sendStatus(403);
}

/**
 * POST /webhook
 * Meta sends every inbound message event here.
 * We immediately return 200 to acknowledge receipt, then process async.
 */
async function receiveMessage(req, res) {
  // Always acknowledge quickly — Meta will retry if you don't respond within 5 s
  res.sendStatus(200);

  try {
    const body = req.body;

    if (body.object !== "whatsapp_business_account") return;

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value;

        // Ignore non-message events (status updates, etc.)
        if (!value.messages || value.messages.length === 0) continue;

        for (const message of value.messages) {
          if (message.type !== "text") continue; // handle only text for now

          const from = message.from;           // customer's phone number
          const text = message.text.body.trim();

          await messageHandler.handleIncoming(from, text);
        }
      }
    }
  } catch (err) {
    console.error("[Webhook] Processing error:", err.message);
  }
}

module.exports = { verifyWebhook, receiveMessage };
