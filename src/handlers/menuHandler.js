const whatsappService = require("../services/whatsappService");
const menuService = require("../services/menuService");

/**
 * Handle MENU intent — send the full restaurant menu.
 * @param {string} from - Customer's phone number
 */
async function handle(from) {
  const menuText = menuService.getMenuText();
  await whatsappService.sendText(from, menuText);
}

module.exports = { handle };
