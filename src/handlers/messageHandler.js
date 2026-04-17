const whatsappService = require("../services/whatsappService");
const menuHandler = require("./menuHandler");
const bookingHandler = require("./bookingHandler");

// ─── Add new intents here ──────────────────────────────────────────────────
// Each intent: { match: (msg) => boolean, handler: async (from, msg) => void }
const intents = [
  {
    name: "menu",
    match: (msg) => msg.toLowerCase() === "menu",
    handler: (from) => menuHandler.handle(from),
  },
  {
    name: "booking",
    match: (msg) => msg.toLowerCase().startsWith("book"),
    handler: (from, msg) => bookingHandler.handle(from, msg),
  },
];

/**
 * Central message router.
 * Called for every inbound text message from a customer.
 *
 * @param {string} from    - Customer's WhatsApp phone number
 * @param {string} message - Text content of the message (trimmed)
 */
async function handleIncoming(from, message) {
  console.log(`[MessageHandler] From: ${from} | Message: "${message}"`);

  for (const intent of intents) {
    if (intent.match(message)) {
      await intent.handler(from, message);
      return;
    }
  }

  // Default / welcome reply
  await whatsappService.sendText(
    from,
    [
      "👋 *Welcome to our Restaurant!*",
      "",
      "How can I help you today?",
      "",
      "• Reply *MENU* — View our menu & prices",
      "• Reply *BOOK* — Reserve a table",
    ].join("\n")
  );
}

module.exports = { handleIncoming };
