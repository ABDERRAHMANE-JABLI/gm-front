'use client';
import { useState, useEffect } from 'react';
import { CartItem, Award } from '@/types/Store';

const CART_KEY = 'gm_store_cart';

export function useCart() {
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
    const existing = items.find(i => i.award.id === award.id);
    if (existing) {
      save(items.map(i => i.award.id === award.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      save([...items, { award, quantity: 1 }]);
    }
  }

  function removeItem(id: string) {
    save(items.filter(i => i.award.id !== id));
  }

  function clearCart() {
    save([]);
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.award.price * i.quantity, 0);

  return { items, addItem, removeItem, clearCart, totalCount, totalPrice };
}
