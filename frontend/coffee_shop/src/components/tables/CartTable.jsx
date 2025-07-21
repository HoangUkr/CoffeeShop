import React from "react";

const CartTable = ({ items, updateQuantity, removeItem }) => {
  return (
    <table className="w-full table-auto bg-white rounded-xl shadow-md">
      <thead className="bg-[#4B2E2E] text-white">
        <tr>
          <th className="px-4 py-3 text-left">ID</th>
          <th className="px-4 py-3 text-left">Product</th>
          <th className="px-4 py-3 text-center">Quantity</th>
          <th className="px-4 py-3 text-right">Price</th>
          <th className="px-4 py-3 text-right">Total</th>
          <th className="px-4 py-3 text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-3 text-gray-900 bg-white">{item.id}</td>
            <td className="px-4 py-3 text-gray-900 bg-white">{item.name}</td>
            <td className="px-4 py-3 flex justify-center items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
              >
                −
              </button>
              <span className="text-gray-900 bg-white">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
              >
                +
              </button>
            </td>
            <td className="px-4 py-3 text-right text-gray-900 bg-white">€{item.price.toFixed(2)}</td>
            <td className="px-4 py-3 text-right text-gray-900 bg-white">
              €{(item.price * item.quantity).toFixed(2)}
            </td>
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
