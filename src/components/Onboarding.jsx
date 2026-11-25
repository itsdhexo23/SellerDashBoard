import { useState } from 'react';

const emptySeller = {
  category: '',
  customCategory: '',
  location: '',
  localDeliveryDays: '',
  otherPinDeliveryDays: '',
  sellerName: '',
  contactNumber: '',
};

const presetCategories = ['Groceries', 'Clothing', 'Electronics', 'Home & kitchen', 'Beauty & personal care'];

function Onboarding({ onComplete, initialSeller = null }) {
  const [seller, setSeller] = useState(() => {
    if (!initialSeller) return emptySeller;
    const isPresetCategory = presetCategories.includes(initialSeller.category);
    return {
      ...emptySeller,
      ...initialSeller,
      category: isPresetCategory ? initialSeller.category : 'Other',
      customCategory: isPresetCategory ? '' : initialSeller.category,
    };
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setSeller((currentSeller) => ({
      ...currentSeller,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onComplete({
      ...seller,
      category: seller.category === 'Other' ? seller.customCategory.trim() : seller.category,
      localDeliveryDays: Number(seller.localDeliveryDays),
      otherPinDeliveryDays: Number(seller.otherPinDeliveryDays),
    });
  }

  return (
    <main className="onboarding-card">
      <div className="form-heading">
        <p className="eyebrow">SELLER DASHBOARD · SETUP</p>
        <h1>Tell us about your business</h1>
        <p>Start with a few details. You can update them later.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>Main product category</span>
            <select name="category" value={seller.category} onChange={handleChange} required>
              <option value="" disabled>Select a category</option>
              {presetCategories.map((category) => <option key={category}>{category}</option>)}
              <option>Other</option>
            </select>
          </label>

          {seller.category === 'Other' && (
            <label className="form-field">
              <span>Enter your category</span>
              <input
                name="customCategory"
                value={seller.customCategory}
                onChange={handleChange}
                placeholder="e.g. Handmade crafts"
                required
                autoFocus
              />
            </label>
          )}

          <label className="form-field">
            <span>Selling location</span>
            <input
              name="location"
              value={seller.location}
              onChange={handleChange}
              placeholder="City or area"
              required
            />
          </label>

          <label className="form-field">
            <span>Local delivery time (days)</span>
            <input
              name="localDeliveryDays"
              type="number"
              min="1"
              value={seller.localDeliveryDays}
              onChange={handleChange}
              placeholder="e.g. 2"
              required
            />
          </label>

          <label className="form-field">
            <span>Other PIN code delivery (days)</span>
            <input
              name="otherPinDeliveryDays"
              type="number"
              min="1"
              value={seller.otherPinDeliveryDays}
              onChange={handleChange}
              placeholder="e.g. 5"
              required
            />
          </label>

          <label className="form-field">
            <span>Seller name</span>
            <input
              name="sellerName"
              value={seller.sellerName}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>

          <label className="form-field">
            <span>Contact number</span>
            <input
              name="contactNumber"
              type="tel"
              value={seller.contactNumber}
              onChange={handleChange}
              placeholder="Your phone number"
              autoComplete="tel"
              required
            />
          </label>
        </div>

        <button className="primary-button" type="submit">Done</button>
      </form>
    </main>
  );
}

export default Onboarding;
