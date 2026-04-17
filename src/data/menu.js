// Restaurant menu data — update this to reflect your actual menu
const menu = {
  starters: [
    { name: "Bruschetta",        price: 6.99,  description: "Grilled bread with tomatoes & basil" },
    { name: "Soup of the Day",   price: 5.50,  description: "Ask your server for today's special" },
    { name: "Garlic Mushrooms",  price: 7.50,  description: "Sautéed in butter and herbs" },
  ],
  mains: [
    { name: "Grilled Salmon",    price: 18.99, description: "With lemon butter & seasonal veg" },
    { name: "Ribeye Steak",      price: 24.99, description: "250g, served with fries & salad" },
    { name: "Pasta Primavera",   price: 13.99, description: "Fresh vegetables in a light cream sauce" },
    { name: "Chicken Parmesan",  price: 15.99, description: "Breaded chicken with marinara & mozzarella" },
  ],
  desserts: [
    { name: "Chocolate Lava Cake", price: 7.99, description: "Warm, with vanilla ice cream" },
    { name: "Cheesecake",          price: 6.99, description: "New York style with berry compote" },
    { name: "Tiramisu",            price: 6.50, description: "Classic Italian dessert" },
  ],
  drinks: [
    { name: "Fresh Juice",    price: 3.99, description: "Orange, apple, or mango" },
    { name: "Soft Drinks",    price: 2.99, description: "Coke, Pepsi, Sprite, Water" },
    { name: "House Wine",     price: 5.99, description: "Red or white, per glass" },
  ],
};

module.exports = menu;
