import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Lock, Save, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProfile() {
  const { user, token, setAuth } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          ...(formData.password ? { password: formData.password } : {})
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      toast.success('Profile updated successfully');
      setAuth(data, token!);
      setFormData(prev => ({ ...prev, password: '' })); // clear password field
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Admin Profile</h1>
        <p className="text-gray-500 mt-1">Manage your administrative account settings and credentials.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-orange-50 p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-orange-100">
          <div className="h-24 w-24 bg-white rounded-full border-4 border-orange-200 flex items-center justify-center text-orange-600 font-black text-4xl shadow-sm">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black text-gray-900">{user?.name}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-orange-700 mt-1 font-bold text-sm bg-orange-100 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
              <ShieldCheck className="h-4 w-4" />
              <span>Super Admin</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-md shadow-orange-600/20"
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
