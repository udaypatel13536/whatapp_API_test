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
    await whatsappService.sendText(
      from,
      [
        "🪑 *Reserve a Table*",
        "",
        "Send your booking in this format:",
        "*BOOK <guests> <date YYYY-MM-DD> <time HH:MM>*",
        "",
        "Example:",
        "`BOOK 4 2026-04-20 19:30`",
      ].join("\n")
    );
    return;
  }

  const result = bookingService.parseBookingRequest(message);

  if (!result.valid) {
    await whatsappService.sendText(from, result.error);
    return;
  }

  const { token, booking } = bookingService.createBooking(
    from,
    result.guests,
    result.date,
    result.time
  );

  const confirmation = bookingService.buildConfirmationMessage(
    token,
    booking.guests,
    booking.date,
    booking.time
  );

  await whatsappService.sendText(from, confirmation);
}

module.exports = { handle };
