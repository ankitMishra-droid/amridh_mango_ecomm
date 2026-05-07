import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { deleteProduct, fetchPaginatedProducts } from '../../store/adminSlice';
import { Edit2, Trash2, Plus, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import AddProductForm from './AddProductForm';

export default function ProductList() {
  const { paginatedProducts, status } = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';
  const stockFilter = searchParams.get('stockFilter') || '';

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchPaginatedProducts({ page, search: searchQuery, stockFilter }));
  }, [dispatch, page, searchQuery, stockFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchInput) prev.set('search', searchInput);
      else prev.delete('search');
      prev.set('page', '1');
      return prev;
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams(prev => {
      if (value) prev.set('stockFilter', value);
      else prev.delete('stockFilter');
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  const products = paginatedProducts?.docs || [];

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

      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-wrap">
        <form onSubmit={handleSearch} className="flex flex-1 max-w-md items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-orange-100 text-orange-700 font-bold rounded-xl hover:bg-orange-200 transition-colors">
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 ml-auto">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={stockFilter}
            onChange={handleFilterChange}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
          >
            <option value="">All Stock Status</option>
            <option value="inStock">In Stock (0)</option>
            <option value="lowStock">Low Stock (&lt;10)</option>
            <option value="outOfStock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {(isAdding || editingProduct) && (
        <AddProductForm
          initialData={editingProduct}
          onClose={() => {
            setIsAdding(false);
            setEditingProduct(null);
            dispatch(fetchPaginatedProducts({ page, search: searchQuery, stockFilter }));
          }}
        />
      )}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product (SKU)</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {status === 'loading' && !paginatedProducts ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500">No products found. Start by adding one!</td>
                </tr>
              ) : (
                products.map((p: any) => (
                  <tr key={p.id || p._id} className="hover:bg-gray-50/50 transition-colors">
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
                      <button onClick={() => setEditingProduct({ ...p, id: p._id || p.id })} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button onClick={async () => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          await dispatch(deleteProduct(p._id || p.id));
                          dispatch(fetchPaginatedProducts({ page, search: searchQuery, stockFilter }));
                        }
                      }} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {paginatedProducts && paginatedProducts.totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50 mt-auto">
            <span className="text-sm text-gray-500">
              Showing page {paginatedProducts.page} of {paginatedProducts.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(paginatedProducts.page - 1)}
                disabled={paginatedProducts.page <= 1}
                className="p-2 rounded border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePageChange(paginatedProducts.page + 1)}
                disabled={paginatedProducts.page >= paginatedProducts.totalPages}
                className="p-2 rounded border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
