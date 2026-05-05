import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { deleteProduct } from '../../store/adminSlice';
import { Edit2, Trash2, Plus } from 'lucide-react';
import AddProductForm from './AddProductForm';

export default function ProductList() {
  const { products, status } = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  if (status === 'loading') {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Inventory & SKU Management</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog, pricing, and stock levels.</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingProduct(null); }}
          className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {(isAdding || editingProduct) && (
        <AddProductForm
          initialData={editingProduct}
          onClose={() => { setIsAdding(false); setEditingProduct(null); }}
        />
      )}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product (SKU)</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded-lg object-cover bg-gray-100" />
                    <div>
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">SKU: {p.sku || 'N/A'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Available Soon' ? 'bg-orange-100 text-orange-700' : p.status === 'Sold Out' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {p.status || 'Available'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setEditingProduct(p)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button onClick={() => {
                    if (confirm('Are you sure you want to delete this product?')) {
                      dispatch(deleteProduct(p.id));
                    }
                  }} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No products found. Start by adding one!
          </div>
        )}
      </div>
    </div>
  );
}
