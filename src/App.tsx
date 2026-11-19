import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import type { CartItem, DeliveryMethod, Product, ProductVariant } from '../shared/types';
import { api } from './lib/api';
import { PAGES, pathForPage, pageForPath } from './lib/pages';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { BookOrderModal } from './components/BookOrderModal';
import { HomePage } from './pages/HomePage';

// Other pages are downloaded only when visited, to keep the first load small.
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const OperationsPage = lazy(() => import('./pages/OperationsPage').then((m) => ({ default: m.OperationsPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then((m) => ({ default: m.NewsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const CART_KEY = 'elim_water_cart';

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = pageForPath(location.pathname);

  const goTo = useCallback((page: string) => navigate(pathForPage(page)), [navigate]);

  // Page title, description and scroll position on every page change.
  useEffect(() => {
    const meta = PAGES[currentPage ?? 'notFound'];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    window.scrollTo({ top: 0 });
  }, [currentPage, location.pathname]);

  // Product catalogue from the server (which gets it from the ERP).
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState('');

  useEffect(() => {
    api
      .getProducts()
      .then((list) => {
        setProducts(list);
        setProductsError('');
      })
      .catch(() => setProductsError('We could not load our product list. Please refresh the page.'));
  }, []);

  // Cart (remembered in this browser only)
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('DELIVERY');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {
      // storage unavailable (private mode); the cart still works for this visit
    }
  }, [cartItems]);

  // When the catalogue loads, drop cart lines that no longer exist and refresh prices.
  useEffect(() => {
    if (products.length === 0) return;
    setCartItems((prev) =>
      prev.flatMap((item) => {
        const variant = products
          .find((p) => p.id === item.productId)
          ?.variants.find((v) => v.id === item.variantId);
        return variant ? [{ ...item, unitPrice: variant.price }] : [];
      })
    );
  }, [products]);

  // Modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingInitialRef, setTrackingInitialRef] = useState('');
  const [trackingInitialPhone, setTrackingInitialPhone] = useState('');

  // Book Order: opens on the front page; step 2 is the checkout form.
  const [isBookOrderOpen, setIsBookOrderOpen] = useState(false);
  const [bookOrderProductId, setBookOrderProductId] = useState<string | undefined>();
  const openBookOrder = (productId?: string) => {
    if (currentPage !== 'home') goTo('home');
    setBookOrderProductId(productId);
    setIsBookOrderOpen(true);
  };

  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number, openCart = true) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.variantId === variant.id);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          quantity,
          unitPrice: variant.price,
          productName: product.name,
          variantName: variant.name,
          packaging: variant.packaging,
          image: product.image,
        },
      ];
    });
    if (openCart) setIsCartOpen(true);
  };

  const handleRemoveCartItem = (productId: string, variantId: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  };

  const handleUpdateCartQty = (productId: string, variantId: string, newQty: number) => {
    if (newQty <= 0) return handleRemoveCartItem(productId, variantId);
    setCartItems((prev) =>
      prev.map((i) => (i.productId === productId && i.variantId === variantId ? { ...i, quantity: newQty } : i))
    );
  };

  const openTracking = () => setIsTrackingModalOpen(true);

  const productProps = {
    products,
    onAddToCart: handleAddToCart,
    onViewProductDetails: (p: Product) => setSelectedProductForDetail(p),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-cyan-500 selection:text-white">
      <div className="flex-1 flex flex-col w-full">
        <Navbar
          currentTab={currentPage ?? ''}
          onNavigate={goTo}
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenTracking={openTracking}
          onBookOrder={() => openBookOrder()}
        />

        {productsError && (
          <div role="alert" className="w-full bg-amber-50 border-b border-amber-200 text-amber-900 text-xs px-4 py-2 text-center">
            {productsError}
          </div>
        )}

        <main className="flex-1 w-full">
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage {...productProps} onNavigate={goTo} onOpenTracking={openTracking} onBookOrder={openBookOrder} />
                }
              />
              <Route path="/about" element={<AboutPage onNavigate={goTo} />} />
              <Route path="/operations" element={<OperationsPage onNavigate={goTo} />} />
              <Route path="/products" element={<ProductsPage {...productProps} />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage onNavigate={goTo} />} />
            </Routes>
          </Suspense>
        </main>

        <Footer
          onNavigate={goTo}
          onOpenTracking={openTracking}
          onOpenDistributorForm={() => goTo('contact')}
        />

        <BookOrderModal
          isOpen={isBookOrderOpen}
          onClose={() => setIsBookOrderOpen(false)}
          products={products}
          cartItems={cartItems}
          initialProductId={bookOrderProductId}
          onAddToCart={(p, v, q) => handleAddToCart(p, v, q, false)}
          onContinueToCheckout={() => {
            setIsBookOrderOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          deliveryMethod={deliveryMethod}
          onChangeDeliveryMethod={setDeliveryMethod}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          deliveryMethod={deliveryMethod}
          onOrderCompleted={() => setCartItems([])}
          onTrackOrder={(ref, phone) => {
            setTrackingInitialRef(ref);
            setTrackingInitialPhone(phone);
            setIsTrackingModalOpen(true);
          }}
        />

        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
          onAddToCart={handleAddToCart}
        />

        <OrderTrackingModal
          isOpen={isTrackingModalOpen}
          onClose={() => {
            setIsTrackingModalOpen(false);
            setTrackingInitialRef('');
            setTrackingInitialPhone('');
          }}
          initialOrderRef={trackingInitialRef}
          initialPhone={trackingInitialPhone}
        />
      </div>
    </div>
  );
}
