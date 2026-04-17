require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  whatsapp: {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
    apiUrl: `https://graph.facebook.com/v19.0`,
  },
};
