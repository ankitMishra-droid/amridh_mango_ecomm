import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateUserRole, updateUserInfo, fetchPaginatedUsers, User } from '../../store/adminSlice';
import { Shield, ShieldAlert, Edit2, Check, X, Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import AddAdminModal from './AddAdminModal';

export default function UserManagement() {
  const { paginatedUsers, status } = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  useEffect(() => {
    dispatch(fetchPaginatedUsers({ page, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchInput) prev.set('search', searchInput);
      else prev.delete('search');
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

  const handleEditClick = (user: User) => {
    setEditingUserId(user._id);
    setEditForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
  };

  const handleSaveEdit = async (userId: string) => {
    await dispatch(updateUserInfo({ userId, data: editForm }));
    setEditingUserId(null);
    dispatch(fetchPaginatedUsers({ page, search: searchQuery })); // Refresh current page
  };

  const users = paginatedUsers?.docs || [];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage customers and administrators, update contact information, and modify roles.</p>
        </div>
        <button
          onClick={() => setIsAddingAdmin(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
        >
          <UserPlus className="h-4 w-4" /> Create Admin
        </button>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-1 max-w-md items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-orange-100 text-orange-700 font-bold rounded-xl hover:bg-orange-200 transition-colors">
            Search
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {status === 'loading' ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
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
                      {user.addresses && user.addresses.length > 0 ? (
                        <div className="text-sm text-gray-600">
                          {user.addresses.map((addr: any, idx: number) => {
                            if (addr.isDefault || (!user.addresses?.some((a: any) => a.isDefault) && idx === 0)) {
                              return (
                                <div key={idx}>
                                  <p className="font-bold text-gray-800">{addr.firstName} {addr.lastName}</p>
                                  <p className="truncate max-w-[200px]" title={addr.address}>{addr.address}</p>
                                  <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                                  {user.addresses && user.addresses.length > 1 && (
                                    <p className="text-xs text-orange-600 font-bold mt-1">+{user.addresses.length - 1} more saved</p>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">No address saved</span>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {paginatedUsers && paginatedUsers.totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50 mt-auto">
            <span className="text-sm text-gray-500">
              Showing page {paginatedUsers.page} of {paginatedUsers.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(paginatedUsers.page - 1)}
                disabled={paginatedUsers.page <= 1}
                className="p-2 rounded border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePageChange(paginatedUsers.page + 1)}
                disabled={paginatedUsers.page >= paginatedUsers.totalPages}
                className="p-2 rounded border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isAddingAdmin && <AddAdminModal onClose={() => setIsAddingAdmin(false)} />}
    </div>
  );
}
