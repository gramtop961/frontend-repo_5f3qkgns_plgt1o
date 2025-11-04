import React from 'react';
import { Sparkles } from 'lucide-react';

export default function OffersBanner() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-amber-300 via-pink-300 to-sky-300 text-slate-800 shadow-lg">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-xl font-bold">Offers & Coupons</h2>
        </div>
        <p className="mt-2 text-sm md:text-base">
          Exciting discounts are coming soon! You'll see automatic savings applied here when available.
        </p>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/30 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
