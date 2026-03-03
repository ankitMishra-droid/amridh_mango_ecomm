import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('All');

  // read query params from URL so we can pre‑select a category
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // respect REACT_APP_API_URL for environments like Netlify functions
    let base = process.env.REACT_APP_API_URL || '';
    if (!base && typeof window !== 'undefined' && window.location.hostname.endsWith('.netlify.app')) {
      base = '/.netlify/functions';
    }
    fetch(`${base}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => {
        console.error('failed to fetch products', err);
      });
  }, []);

  // when products or search params change, apply category from URL if available
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat && cat !== category) {
      // if the category exists in our set (or if we have no products yet we'll still accept it)
      setCategory(cat);
    }
  }, [location.search, products]);


  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // ensure we start at the top when the page/category changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [category]);

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
              onChange={(e) => {
                const val = e.target.value;
                setCategory(val);
                // reflect selection in query string for sharing/bookmarking
                const params = new URLSearchParams(location.search);
                if (val === 'All') {
                  params.delete('cat');
                } else {
                  params.set('cat', val);
                }
                navigate({ search: params.toString() }, { replace: true });
              }}
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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
