import { useState } from 'react';

const blankProduct = {
  name: '',
  category: '',
  price: '',
  brand: '',
  rating: '',
  monthlyPurchase: '',
  returnsAllowed: 'yes',
  returnDays: '7',
  manufacturingDate: '',
  expiryDate: '',
};

const presetCategories = ['Groceries', 'Clothing', 'Electronics', 'Home & kitchen', 'Beauty & personal care'];

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!product) return blankProduct;
    const isPresetCategory = presetCategories.includes(product.category);
    return {
      ...blankProduct,
      ...product,
      category: isPresetCategory ? product.category : 'Other',
      customCategory: isPresetCategory ? '' : product.category,
      price: String(product.price),
      rating: String(product.rating),
      monthlyPurchase: String(product.monthlyPurchase),
      returnDays: String(product.returnDays ?? ''),
      returnsAllowed: product.returnsAllowed ? 'yes' : 'no',
    };
  });
  const [error, setError] = useState('');
  const isEditing = Boolean(product);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (form.expiryDate && form.manufacturingDate && form.expiryDate <= form.manufacturingDate) {
      setError('Expiry date must be later than the manufacturing date.');
      return;
    }
    setError('');
    onSave({
      ...form,
      category: form.category === 'Other' ? form.customCategory.trim() : form.category,
      id: product?.id ?? (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
      price: Number(form.price),
      rating: Number(form.rating),
      monthlyPurchase: Number(form.monthlyPurchase),
      returnsAllowed: form.returnsAllowed === 'yes',
      returnDays: form.returnsAllowed === 'yes' ? Number(form.returnDays) : 0,
    });
  }

  return (
    <main className="app-shell narrow-shell">
      <div className="page-heading">
        <button className="back-button" type="button" onClick={onCancel}>← Dashboard</button>
        <p className="eyebrow">PRODUCT DETAILS</p>
        <h1>{isEditing ? 'Edit product' : 'Add a new product'}</h1>
        <p>Fill in the product information for your store.</p>
      </div>

      <form className="product-form card-surface" onSubmit={handleSubmit}>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-grid">
          <label className="form-field">
            <span>Product name</span>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Cotton T-shirt" required />
          </label>
          <label className="form-field">
            <span>Category</span>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="" disabled>Select a category</option>
              {presetCategories.map((category) => <option key={category}>{category}</option>)}
              <option>Other</option>
            </select>
          </label>
          {form.category === 'Other' && (
            <label className="form-field">
              <span>Enter your category</span>
              <input
                name="customCategory"
                value={form.customCategory ?? ''}
                onChange={handleChange}
                placeholder="e.g. Handmade crafts"
                required
                autoFocus
              />
            </label>
          )}
          <label className="form-field">
            <span>Price (₹)</span>
            <input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
          </label>
          <label className="form-field">
            <span>Brand</span>
            <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand name" required />
          </label>
          <label className="form-field">
            <span>Rating (0–5)</span>
            <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} placeholder="4.5" required />
          </label>
          <label className="form-field">
            <span>Monthly purchases</span>
            <input name="monthlyPurchase" type="number" min="0" step="1" value={form.monthlyPurchase} onChange={handleChange} placeholder="0" required />
          </label>
          <label className="form-field">
            <span>Returns accepted?</span>
            <select name="returnsAllowed" value={form.returnsAllowed} onChange={handleChange}>
              <option value="yes">Yes</option><option value="no">No</option>
            </select>
          </label>
          {form.returnsAllowed === 'yes' && (
            <label className="form-field">
              <span>Return period (days)</span>
              <input name="returnDays" type="number" min="1" value={form.returnDays} onChange={handleChange} required />
            </label>
          )}
          <label className="form-field">
            <span>Manufacturing date</span>
            <input name="manufacturingDate" type="date" value={form.manufacturingDate} onChange={handleChange} required />
          </label>
          <label className="form-field">
            <span>Expiry date</span>
            <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit">{isEditing ? 'Save Changes' : 'Add Product'}</button>
          <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </main>
  );
}

export default ProductForm;
