import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { saveProduct } from '../../store/adminSlice';
import toast from 'react-hot-toast';

export default function AddProductForm({ initialData, onClose }: { initialData?: any, onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string, category: string, description: string, price: number, stock: number, sku: string, image_url: string, images: string[]
  }>(initialData || {
    name: '', category: '', description: '', price: 0, stock: 0, sku: '', image_url: '', images: []
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    
    const uploadData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      uploadData.append('images', e.target.files[i]);
    }

    try {
      const res = await fetch('/api/upload/multiple', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('mango_token')}` },
        body: uploadData
      });
      const data = await res.json();
      if (res.ok) {
        const newUrls = data.urls;
        setFormData(prev => {
           let primary = prev.image_url;
           let additional = prev.images || [];
           if (!primary && newUrls.length > 0) {
             primary = newUrls[0];
             additional = [...additional, ...newUrls.slice(1)];
           } else {
             additional = [...additional, ...newUrls];
           }
           return { ...prev, image_url: primary, images: additional };
        });
        toast.success('Images uploaded successfully!');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      toast.error('Network error during upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }
    
    await dispatch(saveProduct({ 
      id: initialData?.id, 
      data: formData, 
      isAdding: !initialData 
    }));
    onClose();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl mb-8">
      <h3 className="font-black text-2xl text-gray-900 mb-6">{initialData ? 'Edit Product' : 'Add New Product'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Product Name</label>
          <input type="text" placeholder="e.g. Alphonso Mango Box (1 Dozen)" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
          <input type="text" placeholder="e.g. Mangoes" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">SKU</label>
          <input type="text" placeholder="e.g. ALPH-1DZ" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price (₹)</label>
          <input type="number" placeholder="0.00" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Stock Quantity</label>
          <input type="number" placeholder="0" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
          <textarea rows={4} placeholder="Product description..." className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 mb-6">
        <label className="block text-sm font-bold text-gray-900 mb-4">Product Images</label>
        
        {/* File Upload Option */}
        <div className="mb-6 p-8 border-2 border-dashed border-orange-200 rounded-2xl bg-orange-50/30 hover:bg-orange-50 transition-colors text-center relative group cursor-pointer">
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="text-sm text-orange-600 font-bold">
            {isUploading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-orange-600 border-t-transparent rounded-full" /> Uploading to Cloudinary...
              </span>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <svg className="h-8 w-8 text-orange-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Drag & Drop images here, or Click to Browse</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Or Provide Links</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Primary Image URL</label>
            <input type="text" placeholder="https://example.com/image.jpg" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Additional Images (Comma Separated)</label>
            <input type="text" placeholder="url1.jpg, url2.jpg" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" value={(formData as any).images?.join(', ') || ''} onChange={e => setFormData({...formData, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)} as any)} />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button onClick={onClose} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
        <button onClick={handleSave} className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-md shadow-orange-600/20 transition-all">Save Product</button>
      </div>
    </div>
  );
}
