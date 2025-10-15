import { createContext, useContext, useState, useEffect } from "react";
import { dataStorage } from "../../../lib/storage";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export function CartStore({ children }) {
  const cartStorage = dataStorage("cart");
  const normalizeId = (id) => {
    if (id === undefined || id === null) return null;
    return typeof id === "object" ? id?.id ?? JSON.stringify(id) : String(id);
  };

  const [cart, setCart] = useState(() => {
    const saved = cartStorage.get();
    if (!Array.isArray(saved)) return [];
    return saved.map((it) => ({ ...it, id: normalizeId(it.id) }));
  });
  const [isOpen, setIsOpen] = useState(false);


  const addToCart = ({ quantity = 1, ...product }) => {
    const normId = normalizeId(product.id) || uuidv4();
    const productWithId = { id: normId, ...product };
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productWithId.id);
      if (existing) {
        return prev.map((item) =>
          item.id === productWithId.id
            ? { ...item, quantity: item.quantity + Number(quantity) }
            : item
        );
      }
      return [...prev, { ...productWithId, quantity: Number(quantity) }];
    });
  };

  const increaseQty = (id) => {
    const norm = normalizeId(id);
    setCart((prev) =>
      prev.map((item) =>
        item.id === norm ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    const norm = normalizeId(id);
    setCart((prev) =>
      prev.map((item) =>
        item.id === norm && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    const norm = normalizeId(id);
    setCart((prev) => prev.filter((item) => item.id !== norm));
  };

  const clearCart = () => setCart([]);
  useEffect(() => {
    cartStorage.set(cart);
  }, [cart]);

  const totalPrice = cart.reduce((sum, item) => {
    const priceNumber = Number(String(item.price).replace(/[^\d.]/g, ""));
    const unit = Number.isFinite(priceNumber) ? Math.ceil(priceNumber) : 0;
    return sum + unit * item.quantity;
  }, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalPrice,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
