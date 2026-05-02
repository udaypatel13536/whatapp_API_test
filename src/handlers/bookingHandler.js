const whatsappService = require("../services/whatsappService");
const bookingService = require("../services/bookingService");

/**
 * Handle BOOK intent.
 * If the message is just "BOOK" (no params), send usage instructions.
 * If the message has all params, process the booking.
 *
 * @param {string} from    - Customer's phone number
 * @param {string} message - Full original message text (trimmed)
 */
async function handle(from, message) {
  const isPlainBook = message.trim().toLowerCase() === "book";

  if (isPlainBook) {
    await whatsappService.sendlink(
      from,
      [
        "🪑 *Reserve a Table*",
        "",
        "Please visit https://www.youtube.com/@Udaypatel15 to BOOk your day!",
      ].join("\n")
    );
    return;
  }


}

module.exports = { handle };
