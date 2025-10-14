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
    // diagnostic logging to help debug removal issues (show types)
    try {
      // eslint-disable-next-line no-console
      // console.log('[wishlist] removeFromWishlist called with id:', id, 'typeof id:', typeof id, 'normalized:', norm, 'typeof norm:', typeof norm);
    } catch (e) {}
    setWishlist((prev) => {
      // compare as strings to avoid number/string mismatches
      const next = prev.filter((item) => String(item.id) !== String(norm));
      try {
        // eslint-disable-next-line no-console
        // console.log('[wishlist] before ids (with types):', prev.map((p) => ({ id: p.id, type: typeof p.id })), 'after ids (with types):', next.map((n) => ({ id: n.id, type: typeof n.id })));
      } catch (e) {}
      // also log what's in localStorage after update to ensure persistence
      try {
        const stored = wishlistStorage.get();
        // eslint-disable-next-line no-console
        // console.log('[wishlist] localStorage snapshot before returning next:', stored);
      } catch (e) {}
      return next;
    });
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
