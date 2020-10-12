import storage from "./storage";

export function getCart() {
  const defaultCart = {
    items: [],
    updated: Date.now(),
  };
  const cart = storage.getItem("cart");
  return cart || defaultCart;
}

export function getCartItems() {
  const cart = getCart();
  return cart.items;
}

let badgeCount = 0;

export function setCartBadge(count) {
  if (count === undefined) {
    badgeCount += 1;
  } else {
    badgeCount = count;
  }
  uni.setTabBarBadge({
    index: 1,
    text: badgeCount.toString(),
  });
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const exists = cart.items.find((item) => item.id === product.id);
  if (exists) {
    exists.quantity += quantity;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      thumb: product.thumb,
      price: product.price,
      quantity,
    });
  }

  cart.updated = Date.now();
  storage.setItem("cart", cart);
}

export function removeFromCart(id) {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.id !== id);
  cart.updated = Date.now();
  storage.setItem("cart", cart);
}

export function clearCart() {
  storage.removeItem("cart");
}
