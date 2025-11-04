import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import OffersBanner from './components/OffersBanner.jsx';
import MenuGrid from './components/MenuGrid.jsx';
import CartPanel from './components/CartPanel.jsx';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [menu, setMenu] = useState({});
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/menu`);
        const data = await res.json();
        setMenu(data.categories || {});
      } catch (e) {
        console.error('Failed to load menu', e);
      } finally {
        setLoadingMenu(false);
      }
    };
    loadMenu();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.name === item.name && p.price === item.price);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], quantity: clone[idx].quantity + 1 };
        return clone;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const inc = (idx) => setCart((prev) => prev.map((p, i) => (i === idx ? { ...p, quantity: p.quantity + 1 } : p)));
  const dec = (idx) => setCart((prev) => prev.flatMap((p, i) => (i === idx ? (p.quantity > 1 ? [{ ...p, quantity: p.quantity - 1 }] : []) : [p])));
  const remove = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
  const clear = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.quantity, 0), [cart]);

  const submitOrder = async (payload, onReset) => {
    try {
      setPlacing(true);
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to place order');
      const data = await res.json();
      onReset?.();
      clear();
      alert(`Order placed successfully! Order ID: ${data.order_id}`);
      setCartOpen(false);
    } catch (e) {
      alert('Could not place order. Please try again.');
      console.error(e);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-fuchsia-50 to-amber-50">
      <Header onCartClick={() => setCartOpen(true)} cartCount={cartCount} />

      <main className="pb-20">
        <div className="max-w-6xl mx-auto px-4 pt-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Colorful, tasty meals at Bits&Bites
          </h2>
          <p className="mt-2 text-slate-600">Add items to cart and checkout with Cash on Delivery or UPI. No delivery address or cards needed.</p>
        </div>

        <OffersBanner />

        {loadingMenu ? (
          <div className="max-w-6xl mx-auto px-4 mt-10 text-slate-500">Loading menu...</div>
        ) : (
          <MenuGrid menu={menu} onAdd={addToCart} />
        )}
      </main>

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
        onClear={clear}
        onSubmitOrder={submitOrder}
        loading={placing}
      />
    </div>
  );
}
