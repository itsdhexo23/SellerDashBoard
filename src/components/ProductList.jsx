import { useState } from 'react';

function ProductList({ products, onEdit, onDelete, onBack }) {
  const [productToDelete, setProductToDelete] = useState(null);

  function confirmDelete() {
    onDelete(productToDelete.id);
    setProductToDelete(null);
  }

  return (
    <main className="app-shell">
      <div className="page-heading list-heading">
        <button className="back-button" type="button" onClick={onBack}>← Dashboard</button>
        <p className="eyebrow">YOUR INVENTORY</p>
        <h1>Products</h1>
        <p>{products.length} {products.length === 1 ? 'product' : 'products'} in your store</p>
      </div>

      {products.length === 0 ? (
        <section className="empty-state card-surface">
          <span className="empty-icon">▤</span>
          <h2>No products added yet.</h2>
          <p>Add your first product to see it listed here.</p>
        </section>
      ) : (
        <div className="table-wrap card-surface">
          <table>
            <thead>
              <tr>
                <th> # </th><th>Product</th><th>Price</th><th>Category</th><th>Brand</th>
                <th>Expiry</th><th>Rating</th><th>Monthly purchases</th><th>Return policy</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td><strong>{product.name}</strong></td>
                  <td>₹{product.price.toLocaleString('en-IN')}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.expiryDate}</td>
                  <td><span className="rating-pill">★ {product.rating.toFixed(1)}</span></td>
                  <td>{product.monthlyPurchase}</td>
                  <td>{product.returnsAllowed ? `${product.returnDays} days` : 'No returns'}</td>
                  <td className="row-actions">
                    <button className="table-edit" onClick={() => onEdit(product)}>Edit</button>
                    <button className="table-delete" onClick={() => setProductToDelete(product)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {productToDelete && (
        <div className="modal-backdrop" role="presentation">
          <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <p className="eyebrow">CONFIRM DELETE</p>
            <h2 id="delete-title">Are you sure you want to delete this product?</h2>
            <p><strong>{productToDelete.name}</strong> will be removed from your product list.</p>
            <div className="form-actions">
              <button className="delete-confirm" onClick={confirmDelete}>Yes, delete</button>
              <button className="cancel-button" onClick={() => setProductToDelete(null)}>Cancel</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default ProductList;
