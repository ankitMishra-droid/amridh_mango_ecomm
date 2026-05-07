import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { createAdminUser } from '../../store/adminSlice';
import { X, UserPlus } from 'lucide-react';

interface AddAdminModalProps {
  onClose: () => void;
}

export default function AddAdminModal({ onClose }: AddAdminModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createAdminUser(formData)).unwrap();
      onClose();
    } catch (error) {
      // Error is handled by toast in slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Create Admin User</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-gray-50 p-3"
              placeholder="Admin Name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-gray-50 p-3"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-gray-50 p-3"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-gray-50 p-3"
              placeholder="Min 6 characters"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
