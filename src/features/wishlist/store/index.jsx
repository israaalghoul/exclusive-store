import { createContext, useContext, useState, useEffect } from "react";
import { dataStorage } from "../../../lib/storage";
import { v4 as uuidv4 } from "uuid";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const wishlistStorage = dataStorage("wishlist");
  const normalizeId = (id) => {
    if (id === undefined || id === null) return null;
    return typeof id === "object" ? id?.id ?? JSON.stringify(id) : String(id);
  };

  const [wishlist, setWishlist] = useState(() => {
    const saved = wishlistStorage.get();
    if (!Array.isArray(saved)) return [];
    // normalize any stored ids to strings to avoid object coercion issues
    return saved.map((it) => ({ ...it, id: normalizeId(it.id) }));
  });
  const [isOpen, setIsOpen] = useState(false);


  const addToWishlist = ({ ...product }) => {
    const normId = normalizeId(product.id) || uuidv4();
    const productWithId = { id: normId, ...product };
    setWishlist((prev) => {
      const existing = prev.find((item) => item.id === productWithId.id);
      if (existing) {
        return prev.map((item) =>
          item.id === productWithId.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productWithId, quantity: 1 }];
    });
  };



  const removeFromWishlist = (id) => {
    const norm = normalizeId(id);
    setWishlist((prev) => prev.filter((item) => item.id !== norm));
  };

  const clearWishlist = () => setWishlist([]);
  useEffect(() => {
    wishlistStorage.set(wishlist);
  }, [wishlist]);

  const totalPrice = wishlist.reduce((sum, item) => {
    const priceNumber = Number(String(item.price).replace(/[^\d.]/g, ""));
    const unit = Number.isFinite(priceNumber) ? Math.ceil(priceNumber) : 0;
    return sum + unit * item.quantity;
  }, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        totalPrice,
        isOpen,
        openCart,
        closeCart,

      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
