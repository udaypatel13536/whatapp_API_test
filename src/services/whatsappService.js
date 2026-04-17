const axios = require("axios");
const config = require("../config");

const apiBase = `${config.whatsapp.apiUrl}/${config.whatsapp.phoneNumberId}/messages`;

const headers = () => ({
  Authorization: `Bearer ${config.whatsapp.accessToken}`,
  "Content-Type": "application/json",
});

/**
 * Send a plain text message to a WhatsApp number.
 * @param {string} to   - Recipient phone number in international format (e.g. "919876543210")
 * @param {string} text - Message body
 */
async function sendText(to, text) {
  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  };

  try {
    const response = await axios.post(apiBase, payload, { headers: headers() });
    return response.data;
  } catch (err) {
    console.error("[WhatsApp] sendText error:", err.response?.data || err.message);
    throw err;
  }
}

/**
 * Send an interactive list message (buttons/options).
 * @param {string} to
 * @param {string} bodyText
 * @param {string} buttonLabel
 * @param {Array}  sections   - Array of { title, rows: [{ id, title, description }] }
 */
async function sendList(to, bodyText, buttonLabel, sections) {
  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "list",
      body: { text: bodyText },
      action: {
        button: buttonLabel,
        sections,
      },
    },
  };

  try {
    const response = await axios.post(apiBase, payload, { headers: headers() });
    return response.data;
  } catch (err) {
    console.error("[WhatsApp] sendList error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { sendText, sendList };
