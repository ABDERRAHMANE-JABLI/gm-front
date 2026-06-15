'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Award } from '@/types/Store';

const CART_KEY = 'gm_store_cart';

interface CartContextValue {
  items: CartItem[];
  addItem: (award: Award) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  function save(next: CartItem[]) {
    setItems(next);
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
  }

  function addItem(award: Award) {
    setItems(prev => {
      const existing = prev.find(i => i.award.id === award.id);
      const next = existing
        ? prev.map(i => i.award.id === award.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { award, quantity: 1 }];
      try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function removeItem(id: string) {
    save(items.filter(i => i.award.id !== id));
  }

  function clearCart() { save([]); }

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.award.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used inside CartProvider');
  return ctx;
}
