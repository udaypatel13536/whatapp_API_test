const menu = require("../data/menu");

/**
 * Build a formatted text menu string for WhatsApp.
 */
function getMenuText() {
  const currency = "$";
  const line = "─────────────────────";

  const formatSection = (title, items) => {
    const rows = items
      .map((item) => `  • *${item.name}* — ${currency}${item.price.toFixed(2)}\n    _${item.description}_`)
      .join("\n");
    return `*${title.toUpperCase()}*\n${rows}`;
  };

  return [
    "🍽️ *Welcome to Our Restaurant Menu*",
    line,
    formatSection("🥗 Starters", menu.starters),
    line,
    formatSection("🍽️ Main Course", menu.mains),
    line,
    formatSection("🍰 Desserts", menu.desserts),
    line,
    formatSection("🥤 Drinks", menu.drinks),
    line,
    "Reply *BOOK* to reserve a table\nReply *MENU* anytime to see this again",
  ].join("\n\n");
}

module.exports = { getMenuText };
