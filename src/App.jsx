import { useEffect, useState } from 'react';
import Onboarding from './components/Onboarding.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';

const SELLER_KEY = 'seller-dashboard-seller';
const PRODUCTS_KEY = 'seller-dashboard-products';

function readSavedValue(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [seller, setSeller] = useState(() => readSavedValue(SELLER_KEY, null));
  const [products, setProducts] = useState(() => readSavedValue(PRODUCTS_KEY, []));
  const [view, setView] = useState(() => seller ? 'dashboard' : 'onboarding');
  const [editingProduct, setEditingProduct] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (seller) localStorage.setItem(SELLER_KEY, JSON.stringify(seller));
    else localStorage.removeItem(SELLER_KEY);
  }, [seller]);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  function handleSellerSave(sellerDetails) {
    setSeller(sellerDetails);
    setNotice('Seller details saved. Welcome to your dashboard!');
    setView('dashboard');
  }

  function handleProductSave(productDetails) {
    if (editingProduct) {
      setProducts((current) => current.map((product) => (
        product.id === editingProduct.id ? productDetails : product
      )));
      setNotice('Product updated successfully.');
    } else {
      setProducts((current) => [...current, productDetails]);
      setNotice('Product added successfully.');
    }
    setEditingProduct(null);
    setView('products');
  }

  function startEditing(product) {
    setEditingProduct(product);
    setNotice('');
    setView('form');
  }

  function handleDelete(productId) {
    setProducts((current) => current.filter((product) => product.id !== productId));
    setNotice('Product deleted.');
  }

  function showDashboard() {
    setEditingProduct(null);
    setNotice('');
    setView('dashboard');
  }

  if (view === 'onboarding' || !seller) {
    return <Onboarding initialSeller={seller} onComplete={handleSellerSave} />;
  }

  if (view === 'form') {
    return (
      <>
        {notice && <p className="status-banner" role="status">{notice}</p>}
        <ProductForm
          key={editingProduct?.id ?? 'new-product'}
          product={editingProduct}
          onSave={handleProductSave}
          onCancel={showDashboard}
        />
      </>
    );
  }

  return (
    <>
      {notice && <p className="status-banner" role="status">{notice}</p>}
      {view === 'products' ? (
        <ProductList
          products={products}
          onEdit={startEditing}
          onDelete={handleDelete}
          onBack={showDashboard}
        />
      ) : (
        <Dashboard
          seller={seller}
          productCount={products.length}
          onAddProduct={() => { setEditingProduct(null); setNotice(''); setView('form'); }}
          onShowProducts={() => { setNotice(''); setView('products'); }}
          onEditSeller={() => { setNotice(''); setView('onboarding'); }}
        />
      )}
    </>
  );
}

export default App;
