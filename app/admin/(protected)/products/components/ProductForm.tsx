'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

interface ProductFormProps {
  initialData?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Single Bottle',
    description: '',
    perks: '',
    image_url: '',
    price_original: '',
    price_current: '',
    is_active: true,
    sort_order: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        perks: initialData.perks ? initialData.perks.join(', ') : '',
        price_original: initialData.price_original?.toString() || '',
        price_current: initialData.price_current?.toString() || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      perks: formData.perks.split(',').map(p => p.trim()).filter(Boolean),
      price_original: formData.price_original ? parseFloat(formData.price_original) : null,
      price_current: parseFloat(formData.price_current),
      sort_order: parseInt(formData.sort_order.toString(), 10) || 0,
    };

    try {
      const url = initialData ? `/api/admin/products/${initialData.id}` : '/api/admin/products';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save product');
      }

      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview data mapped for ProductCard
  let previewTag: string | undefined;
  let previewTagEmoji = '⭐';
  if (parseFloat(formData.price_original) > parseFloat(formData.price_current)) {
    previewTag = formData.category === 'Combo' ? 'BEST VALUE' : 'SALE';
  }
  if (formData.category === 'Single Bottle') previewTagEmoji = formData.name.includes('Chilli') ? '🌶 Spicy' : '🌸 Aromatic';
  if (formData.category === 'Pouch Pack') previewTagEmoji = '🎒 Pouch';
  if (formData.category === 'Combo') previewTagEmoji = '🎁 Combo';

  const previewProduct = {
    id: formData.slug || 'preview',
    category: formData.category as any,
    subCategoryTitle: formData.category,
    name: formData.name || 'Product Name',
    description: formData.description || 'Description will appear here...',
    perks: formData.perks.split(',').map(p => p.trim()).filter(Boolean),
    image: formData.image_url || 'https://via.placeholder.com/300x300.png?text=No+Image',
    priceOriginal: formData.price_original ? `₹${formData.price_original}` : undefined,
    priceCurrent: `₹${formData.price_current || 0}`,
    tag: previewTag,
    tagEmoji: previewTagEmoji,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Side */}
      <div className="bg-white p-6 rounded-card border border-creamDark shadow-sm">
        <h2 className="text-xl font-bold text-greenDark mb-6">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-redAccent/10 text-redAccent rounded-lg text-sm border border-redAccent/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-greenDark mb-1">Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
            </div>
            <div>
              <label className="block text-sm font-bold text-greenDark mb-1">Slug</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="auto-generated if empty" className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-greenDark mb-1">Category *</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark">
                <option value="Single Bottle">Single Bottle</option>
                <option value="Pouch Pack">Pouch Pack</option>
                <option value="Combo">Combo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-greenDark mb-1">Sort Order</label>
              <input type="number" name="sort_order" required value={formData.sort_order} onChange={handleChange} className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-greenDark mb-1">Description *</label>
            <textarea name="description" required rows={3} value={formData.description} onChange={handleChange} className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark"></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-greenDark mb-1">Perks (comma-separated)</label>
            <input type="text" name="perks" value={formData.perks} onChange={handleChange} placeholder="e.g. Aids Digestion, Vegan" className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
          </div>

          <div>
            <label className="block text-sm font-bold text-greenDark mb-1">Image URL *</label>
            <input type="text" name="image_url" required value={formData.image_url} onChange={handleChange} placeholder="/images/..." className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-greenDark mb-1">Price Original (₹)</label>
              <input type="number" step="0.01" name="price_original" value={formData.price_original} onChange={handleChange} className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
            </div>
            <div>
              <label className="block text-sm font-bold text-greenDark mb-1">Price Current (₹) *</label>
              <input type="number" step="0.01" required name="price_current" value={formData.price_current} onChange={handleChange} className="w-full px-3 py-2 bg-cream/30 border border-creamDark rounded-lg focus:outline-none focus:border-greenDark" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-4 h-4 text-greenDark bg-cream border-creamDark rounded focus:ring-greenDark" />
            <label htmlFor="is_active" className="text-sm font-bold text-greenDark">Active on Storefront</label>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-creamDark">
            <button type="button" onClick={onCancel} className="px-6 py-2 rounded-full border border-creamDark text-textMid hover:bg-cream/50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-full bg-greenDark text-white font-bold hover:bg-greenMid transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Side */}
      <div>
        <h3 className="text-sm font-bold text-textMid uppercase tracking-wider mb-4">Live Preview</h3>
        <div className="max-w-[340px] pointer-events-none opacity-90">
          <ProductCard product={previewProduct} />
        </div>
      </div>
    </div>
  );
}
