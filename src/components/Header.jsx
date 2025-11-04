import React from 'react';
import { ShoppingCart, Utensils } from 'lucide-react';

export default function Header({ onCartClick, cartCount }) {
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Utensils className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Bits&Bites</h1>
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">Restaurant</span>
        </div>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-rose-600 font-semibold shadow-md hover:shadow-lg transition"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs font-bold bg-rose-600 text-white w-6 h-6 grid place-items-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
