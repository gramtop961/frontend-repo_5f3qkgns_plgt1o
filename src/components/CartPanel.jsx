import React, { useMemo, useState } from 'react';

export default function CartPanel({ open, onClose, cart, onInc, onDec, onRemove, onClear, onSubmitOrder, loading }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('cod');
  const [notes, setNotes] = useState('');

  const subtotal = useMemo(() => cart.reduce((s, it) => s + it.price * it.quantity, 0), [cart]);
  const discount = 0;
  const total = Math.max(0, subtotal - discount);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;
    const payload = {
      customer_name: customerName.trim(),
      phone: phone.trim(),
      payment_method: payment,
      items: cart.map(({ name, price, quantity, category }) => ({ name, price, quantity, category })),
      subtotal,
      discount,
      total,
      notes: notes.trim() || undefined,
    };
    onSubmitOrder(payload, () => {
      setCustomerName('');
      setPhone('');
      setPayment('cod');
      setNotes('');
    });
  };

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'} `}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
          <h3 className="font-extrabold text-lg">Your Cart</h3>
          <button className="text-rose-600 font-semibold" onClick={onClose}>Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          {/* Items */}
          <div className="space-y-3">
            {cart.length === 0 ? (
              <p className="text-slate-500">Your cart is empty. Add some tasty items!</p>
            ) : (
              cart.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-semibold text-slate-800">{it.name}</p>
                    <p className="text-xs text-slate-500">{it.category}</p>
                    <p className="text-rose-600 font-bold">₹{it.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onDec(idx)} className="w-8 h-8 rounded-full bg-slate-100">-</button>
                    <span className="min-w-[2ch] text-center">{it.quantity}</span>
                    <button onClick={() => onInc(idx)} className="w-8 h-8 rounded-full bg-slate-100">+</button>
                    <button onClick={() => onRemove(idx)} className="ml-2 text-xs text-rose-600">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="rounded-xl bg-gradient-to-br from-rose-50 to-fuchsia-50 border p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Discounts</span>
              <span className="font-semibold">-₹{discount.toFixed(2)}</span>
            </div>
            <div className="mt-2 border-t pt-2 flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-rose-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout */}
          <form onSubmit={handlePlaceOrder} className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Name</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Phone</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Contact number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Payment</label>
              <div className="mt-1 flex gap-3">
                <label className={`px-3 py-2 rounded-lg border cursor-pointer ${payment==='cod' ? 'bg-rose-50 border-rose-300' : ''}`}>
                  <input type="radio" name="payment" className="mr-2" checked={payment==='cod'} onChange={() => setPayment('cod')} />
                  Cash on Delivery
                </label>
                <label className={`px-3 py-2 rounded-lg border cursor-pointer ${payment==='upi' ? 'bg-rose-50 border-rose-300' : ''}`}>
                  <input type="radio" name="payment" className="mr-2" checked={payment==='upi'} onChange={() => setPayment('upi')} />
                  UPI
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Notes (optional)</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={onClear} className="text-sm text-slate-500">Clear Cart</button>
              <button
                type="submit"
                disabled={cart.length===0 || loading}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-semibold shadow disabled:opacity-50"
              >
                {loading ? 'Placing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
