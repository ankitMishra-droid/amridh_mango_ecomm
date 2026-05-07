import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { formatPrice } from '../lib/utils';
import { Package, Truck, CheckCircle, Clock, User, MapPin, Settings, Plus, Trash2, Edit2, ShieldCheck, Mail, Phone, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const { user, token, setAuth } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');
  
  // Profile Form State
  const [isProcessingProfile, setIsProcessingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '',
  });

  // Addresses State
  const [addresses, setAddresses] = useState<any[]>(user?.addresses || []);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessingAddress, setIsProcessingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false
  });

  useEffect(() => {
    if (user && token && activeTab === 'orders' && orders.length === 0) {
      fetch(`/api/orders/user/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error) setOrders(data);
        })
        .catch(err => console.error('Failed to fetch orders:', err));
    }
  }, [user, token, activeTab, orders.length]);

  // Sync addresses if user object updates
  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setAddressForm({ ...addressForm, [e.target.name]: value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingProfile(true);

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          ...(profileData.password ? { password: profileData.password } : {})
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to update profile');

      toast.success('Profile updated successfully');
      setAuth(data, token!);
      setProfileData(prev => ({ ...prev, password: '' }));
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsProcessingProfile(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingAddress(true);

    try {
      const response = await fetch('/api/users/profile/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressForm)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to add address');

      toast.success('Address added successfully');
      setAuth(data, token!);
      setShowAddressForm(false);
      setAddressForm({
        firstName: '', lastName: '', address: '', city: '', state: '', zipCode: '', phone: '', isDefault: false
      });
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsProcessingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    try {
      const response = await fetch(`/api/users/profile/addresses/${addressId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete address');
      
      toast.success('Address removed');
      setAuth(data, token!);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      const response = await fetch(`/api/users/profile/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to set default address');
      
      toast.success('Default address updated');
      setAuth(data, token!);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Placed': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Packed': return <Package className="h-5 w-5 text-orange-500" />;
      case 'Shipped': return <Truck className="h-5 w-5 text-purple-500" />;
      case 'Delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'orders', label: 'Order History', icon: Package },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-sm mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2">Hello, {user?.name?.split(' ')[0] || 'User'}!</h1>
          <p className="text-gray-600">Manage your orders, addresses, and account settings.</p>
        </div>
        <div className="h-20 w-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-black text-3xl">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-[2rem] border border-orange-50 p-4 space-y-2 sticky top-24 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] border border-orange-50 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="h-6 w-6 text-orange-600" />
                Account Settings
              </h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-gray-50 text-gray-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gray-400" />
                      New Password (Optional)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={profileData.password}
                      onChange={handleProfileChange}
                      placeholder="Leave blank to keep current"
                      minLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessingProfile}
                    className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-md shadow-orange-600/20"
                  >
                    {isProcessingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center bg-white rounded-[2rem] border border-orange-50 p-8 shadow-sm">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-orange-600" />
                  Saved Addresses
                </h2>
                {!showAddressForm && (
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-100 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    Add New
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showAddressForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-[2rem] border border-orange-50 overflow-hidden shadow-sm"
                  >
                    <form onSubmit={handleAddressSubmit} className="p-8 space-y-6">
                      <h3 className="text-lg font-black text-gray-900 mb-4">Add New Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" name="firstName" value={addressForm.firstName} onChange={handleAddressChange} placeholder="First Name" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                        <input type="text" name="lastName" value={addressForm.lastName} onChange={handleAddressChange} placeholder="Last Name" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                        <input type="text" name="phone" value={addressForm.phone} onChange={handleAddressChange} placeholder="Phone Number" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                        <input type="text" name="address" value={addressForm.address} onChange={handleAddressChange} placeholder="Street Address" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none md:col-span-2" />
                        <input type="text" name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                        <input type="text" name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                        <input type="text" name="zipCode" value={addressForm.zipCode} onChange={handleAddressChange} placeholder="ZIP Code" required className="px-4 py-3 rounded-xl border focus:border-orange-500 outline-none" />
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                          <input type="checkbox" name="isDefault" checked={addressForm.isDefault} onChange={handleAddressChange} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                          Set as default address
                        </label>
                      </div>
                      <div className="flex gap-4 pt-4 border-t border-gray-100">
                        <button type="button" onClick={() => setShowAddressForm(false)} className="px-6 py-3 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 text-gray-700">Cancel</button>
                        <button type="submit" disabled={isProcessingAddress} className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 flex-1 flex justify-center shadow-md">
                          {isProcessingAddress ? 'Saving...' : 'Save Address'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.length === 0 && !showAddressForm ? (
                  <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-gray-100">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No addresses saved yet.</p>
                  </div>
                ) : (
                  addresses.map((addr: any) => (
                    <div key={addr._id} className={`bg-white p-6 rounded-3xl border-2 transition-all ${addr.isDefault ? 'border-orange-400 shadow-md' : 'border-gray-100 shadow-sm hover:border-orange-200'}`}>
                      {addr.isDefault && (
                        <div className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">Default Address</div>
                      )}
                      <p className="font-black text-lg text-gray-900">{addr.firstName} {addr.lastName}</p>
                      <p className="text-gray-600 mt-2">{addr.address}</p>
                      <p className="text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p className="text-gray-600 mt-2 flex items-center gap-2"><Phone className="h-4 w-4" /> {addr.phone}</p>
                      
                      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefaultAddress(addr._id)} className="text-sm font-bold text-orange-600 hover:text-orange-700 flex-1 text-left">
                            Set as Default
                          </button>
                        )}
                        <button onClick={() => handleDeleteAddress(addr._id)} className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 ml-auto">
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-black mb-6">Order History</h2>
              {orders.length > 0 ? orders.map(order => (
                <div key={order.id} className="bg-white p-8 rounded-[2rem] border border-orange-50 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Order #{order.id}</p>
                      <p className="text-sm text-gray-500 font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                      {getStatusIcon(order.status)}
                      <span className="font-bold">{order.status}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-orange-600">{formatPrice(order.total)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors">
                        <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-xl shadow-sm" />
                        <div>
                          <p className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 bg-white rounded-[2rem] border border-gray-100">
                  <Package className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium text-lg">No orders placed yet.</p>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
