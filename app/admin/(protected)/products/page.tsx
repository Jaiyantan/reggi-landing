'use client';

import { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSave = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  if (loading && !products.length) return <div className="text-center py-10">Loading products...</div>;

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-redAccent/10 text-redAccent rounded-lg text-sm border border-redAccent/20">
          {error}
        </div>
      )}

      {isFormOpen ? (
        <ProductForm 
          initialData={selectedProduct} 
          onSave={handleSave} 
          onCancel={() => { setIsFormOpen(false); setSelectedProduct(null); }} 
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-greenDark">Products</h2>
            <button
              onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}
              className="bg-greenDark text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-greenMid transition-colors shadow-sm"
            >
              + Add Product
            </button>
          </div>

          <div className="bg-white rounded-card shadow-sm border border-creamDark overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream/50 text-textMid text-xs uppercase tracking-wider border-b border-creamDark">
                  <th className="p-4 font-bold">Image</th>
                  <th className="p-4 font-bold">Name & Slug</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold text-right">Price</th>
                  <th className="p-4 font-bold text-center">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-creamDark">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-textMid">No products found. Add one to get started!</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-cream/20 transition-colors">
                      <td className="p-4 w-16">
                        <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded object-cover border border-creamDark" />
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-greenDark text-sm">{product.name}</div>
                        <div className="text-textLight text-xs">{product.slug}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-cream border border-creamDark px-2 py-1 rounded-md text-xs font-medium text-textMid">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {product.price_original && (
                          <div className="text-xs text-textLight line-through">₹{product.price_original}</div>
                        )}
                        <div className="font-bold text-greenDark">₹{product.price_current}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex w-3 h-3 rounded-full ${product.is_active ? 'bg-whatsapp shadow-[0_0_8px_rgba(37,211,102,0.6)]' : 'bg-redAccent/60'}`} title={product.is_active ? 'Active' : 'Inactive'} />
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button onClick={() => handleEdit(product)} className="text-amber hover:text-amberLight font-bold text-sm px-3 py-1">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product.id, product.name)} className="text-redAccent hover:text-red-700 font-bold text-sm px-3 py-1 ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
