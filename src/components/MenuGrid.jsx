import React from 'react';

function Category({ title, items, onAdd }) {
  return (
    <section className="mt-8">
      <h3 className="text-xl font-extrabold tracking-tight text-slate-800">{title}</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-rose-600 font-bold">₹{item.price}</p>
              </div>
              <button
                onClick={() => onAdd({ ...item, category: title })}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-sm font-semibold shadow hover:opacity-90"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuGrid({ menu, onAdd }) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      {Object.entries(menu).map(([cat, items]) => (
        <Category key={cat} title={cat} items={items} onAdd={onAdd} />)
      )}
    </div>
  );
}
