import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateUserRole, updateUserInfo, User } from '../../store/adminSlice';
import { Shield, ShieldAlert, Edit2, Check, X } from 'lucide-react';

export default function UserManagement() {
  const { users, status } = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });

  if (status === 'loading') {
    return <div className="p-8">Loading users...</div>;
  }

  const handleEditClick = (user: User) => {
    setEditingUserId(user._id);
    setEditForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
  };

  const handleSaveEdit = async (userId: string) => {
    await dispatch(updateUserInfo({ userId, data: editForm }));
    setEditingUserId(null);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-1">Manage customers and administrators, update contact information, and modify roles.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {editingUserId === user._id ? (
                      <input 
                        type="text" 
                        value={editForm.name} 
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                        className="border p-2 rounded w-full"
                        placeholder="Name"
                      />
                    ) : (
                      <>
                        <p className="font-bold text-gray-900">{user.name || 'N/A'}</p>
                        <p className="text-xs text-gray-500 mt-0.5">ID: {user._id}</p>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUserId === user._id ? (
                      <div className="space-y-2">
                        <input 
                          type="email" 
                          value={editForm.email} 
                          onChange={e => setEditForm({...editForm, email: e.target.value})}
                          className="border p-2 rounded w-full"
                          placeholder="Email"
                        />
                        <input 
                          type="text" 
                          value={editForm.phone} 
                          onChange={e => setEditForm({...editForm, phone: e.target.value})}
                          className="border p-2 rounded w-full"
                          placeholder="Phone"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.phone || 'No phone'}</p>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' ? <ShieldAlert className="h-4 w-4 text-red-500" /> : <Shield className="h-4 w-4 text-blue-500" />}
                      <select 
                        value={user.role}
                        onChange={(e) => {
                          if (confirm(`Are you sure you want to change this user's role to ${e.target.value}?`)) {
                            dispatch(updateUserRole({ userId: user._id, role: e.target.value }));
                          }
                        }}
                        className={`text-xs font-bold px-2 py-1 rounded-full outline-none cursor-pointer ${
                          user.role === 'admin' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingUserId === user._id ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingUserId(null)} className="text-gray-500 p-2 hover:bg-gray-100 rounded-lg">
                          <X className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleSaveEdit(user._id)} className="text-green-600 p-2 hover:bg-green-50 rounded-lg">
                          <Check className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleEditClick(user)} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
