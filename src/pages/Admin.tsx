import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Product, Order } from '../types';
import { formatPrice } from '../lib/utils';
import { Package, Users, ShoppingBag, TrendingUp, Edit2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = React.useState<number | null>(null);
  const [newStock, setNewStock] = React.useState(0);

  React.useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
    fetch('/api/orders').then(res => res.json()).then(setOrders);
  }, []);

  if (user?.role !== 'admin') {
    return <div className="p-20 text-center text-2xl font-bold">Access Denied</div>;
  }

  const updateStatus = async (orderId: number, status: string) => {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: status as any } : o));
      toast.success('Status updated');
    }
  };

  const updateStock = async (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const res = await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock, price: product.price })
    });
    if (res.ok) {
      setProducts(products.map(p => p.id === productId ? { ...p, stock: newStock } : p));
      setEditingProduct(null);
      toast.success('Stock updated');
    }
  };

  const stats = [
    { label: 'Total Revenue', value: formatPrice(orders.reduce((acc, o) => acc + o.total, 0)), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Products', value: products.length, icon: Package, color: 'text-orange-600' },
    { label: 'Low Stock', value: products.filter(p => p.stock < 20).length, icon: Users, color: 'text-red-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-black">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-orange-50 shadow-sm">
            <s.icon className={`h-8 w-8 ${s.color} mb-4`} />
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{s.label}</p>
            <p className="text-3xl font-black mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Inventory Management */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <div className="bg-white rounded-3xl border border-orange-50 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4">
                      <p className="font-bold">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      {editingProduct === p.id ? (
                        <input 
                          type="number" 
                          value={newStock}
                          onChange={(e) => setNewStock(parseInt(e.target.value))}
                          className="w-20 px-2 py-1 border rounded"
                        />
                      ) : (
                        <span className={cn("font-bold", p.stock < 20 ? "text-red-600" : "text-gray-900")}>
                          {p.stock}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingProduct === p.id ? (
                        <button onClick={() => updateStock(p.id)} className="text-green-600 hover:text-green-700">
                          <Check className="h-5 w-5" />
                        </button>
                      ) : (
                        <button onClick={() => { setEditingProduct(p.id); setNewStock(p.stock); }} className="text-gray-400 hover:text-orange-600">
                          <Edit2 className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Management */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-orange-50 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.user_name}</p>
                  </div>
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="text-sm font-bold bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{order.items.length} items</p>
                  <p className="font-black">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
