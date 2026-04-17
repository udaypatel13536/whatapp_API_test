const { v4: uuidv4 } = require("uuid");
const bookings = require("../data/bookings");

/**
 * Parse a booking request from the customer's message.
 * Expected format (case-insensitive):
 *   BOOK <guests> <date> <time>
 *   e.g.  "book 4 2026-04-20 19:30"
 *
 * @param {string} message
 * @returns {{ valid: boolean, guests?: number, date?: string, time?: string, error?: string }}
 */
function parseBookingRequest(message) {
  // Match: BOOK <number> <date YYYY-MM-DD> <time HH:MM>
  const match = message
    .trim()
    .match(/^book\s+(\d+)\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})$/i);

  if (!match) {
    return {
      valid: false,
      error:
        "❌ Invalid format. Please use:\n*BOOK <guests> <date> <time>*\nExample: `BOOK 4 2026-04-20 19:30`",
    };
  }

  const guests = parseInt(match[1], 10);
  const date = match[2];
  const time = match[3];

  if (guests < 1 || guests > 20) {
    return { valid: false, error: "❌ Guest count must be between 1 and 20." };
  }

  return { valid: true, guests, date, time };
}

/**
 * Create a booking and return the confirmation token.
 * @param {string} customerPhone
 * @param {number} guests
 * @param {string} date
 * @param {string} time
 * @returns {{ token: string, booking: object }}
 */
function createBooking(customerPhone, guests, date, time) {
  const token = uuidv4().split("-")[0].toUpperCase(); // short 8-char token
  const booking = {
    token,
    customerPhone,
    guests,
    date,
    time,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.set(token, booking);
  console.log(`[Booking] Created: ${JSON.stringify(booking)}`);
  return { token, booking };
}

/**
 * Look up a booking by token.
 * @param {string} token
 */
function getBooking(token) {
  return bookings.get(token.toUpperCase()) || null;
}

/**
 * Build the confirmation message sent back to the customer.
 */
function buildConfirmationMessage(token, guests, date, time) {
  return [
    "✅ *Table Booked Successfully!*",
    "",
    `📅 Date:   *${date}*`,
    `🕐 Time:   *${time}*`,
    `👥 Guests: *${guests}*`,
    `🎫 Token:  *${token}*`,
    "",
    "Please show this token when you arrive.",
    "Reply *MENU* to browse our menu.",
  ].join("\n");
}

module.exports = { parseBookingRequest, createBooking, getBooking, buildConfirmationMessage };
