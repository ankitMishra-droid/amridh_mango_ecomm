import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('All');

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Our Collection</h1>
          <p className="text-gray-600">Freshly harvested and ready to ship.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search mangoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-12 pr-10 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none appearance-none bg-white w-full"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
