function Dashboard({ seller, productCount, onAddProduct, onShowProducts, onEditSeller }) {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#dashboard" aria-label="Seller Dashboard home">
          <span className="brand-mark">S</span>
          <span>Seller<span className="brand-light">Desk</span></span>
        </a>
        <span className="topbar-note">PRODUCT MANAGEMENT</span>
      </header>

      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">YOUR STORE</p>
          <h1>Welcome, {seller.sellerName}</h1>
          <p className="hero-copy">A clear view of your products and seller details.</p>
        </div>
        <div className="seller-chip">
          <span className="seller-avatar">{seller.sellerName.charAt(0).toUpperCase()}</span>
          <span><strong>{seller.category}</strong><small>{seller.location}</small></span>
        </div>
      </section>

      <section className="dashboard-grid" aria-label="Seller dashboard actions">
        <article className="summary-card">
          <p className="summary-label">PRODUCTS IN YOUR STORE</p>
          <p className="summary-number">{productCount}</p>
          <p className="summary-foot">Saved in this browser</p>
        </article>

        <article className="action-card">
          <span className="action-icon">＋</span>
          <h2>Add a product</h2>
          <p>Enter the details for a new item in your store.</p>
          <button className="primary-button" onClick={onAddProduct}>Add New Product</button>
        </article>

        <article className="action-card">
          <span className="action-icon sage-icon">▤</span>
          <h2>View your products</h2>
          <p>Review, edit, or remove items from your product list.</p>
          <button className="secondary-button" onClick={onShowProducts}>Show Products</button>
        </article>
      </section>

      <section className="seller-details">
        <div>
          <p className="section-kicker">SELLER DETAILS</p>
          <p>{seller.location} · Local delivery {seller.localDeliveryDays} days · Other PIN codes {seller.otherPinDeliveryDays} days</p>
        </div>
        <button className="text-button" onClick={onEditSeller}>Edit seller details</button>
      </section>
    </main>
  );
}

export default Dashboard;
