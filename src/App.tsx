import React, { useState, useEffect } from 'react';
import { erpStorage } from './services/erpStorage';
import {
  Product,
  OnlineOrder,
  StaffMember,
  Vehicle,
  DispatchRecord,
  CustomerInquiry,
  CartItem,
  DeliveryMethod,
  ProductVariant,
} from './types/erp';

// Customer Components & Pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OperationsPage } from './pages/OperationsPage';
import { ProductsPage } from './pages/ProductsPage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

// Admin ERP Components
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { OrderInbox } from './admin/OrderInbox';
import { OrderDetailDrawer } from './admin/OrderDetailDrawer';
import { DispatchManagement } from './admin/DispatchManagement';
import { StaffWorkspace } from './admin/StaffWorkspace';
import { ErpInventoryLedger } from './admin/ErpInventoryLedger';
import { InquiriesAdmin } from './admin/InquiriesAdmin';
import { ContentAdmin } from './admin/ContentAdmin';
import { AuditLogsAdmin } from './admin/AuditLogsAdmin';

export default function App() {
  // Navigation State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentPublicTab, setCurrentPublicTab] = useState('home');
  const [currentAdminTab, setCurrentAdminTab] = useState('dashboard');

  // ERP Authoritative Data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OnlineOrder[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [dispatches, setDispatches] = useState<DispatchRecord[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);

  // Active Operator (Defaults to Folake Adeyemi, the designated Senior Order Desk & Fulfillment Coordinator)
  const [activeStaff, setActiveStaff] = useState<StaffMember | null>(null);

  // Cart & Booking
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elim_water_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('DELIVERY');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modals & Drawers
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<OnlineOrder | null>(null);
  const [targetOrderForDispatch, setTargetOrderForDispatch] = useState<OnlineOrder | null>(null);

  // Tracking Modal
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingInitialRef, setTrackingInitialRef] = useState('');
  const [trackingInitialPhone, setTrackingInitialPhone] = useState('');

  // Initial Load & Reactive Subscription
  const loadErpData = () => {
    const p = erpStorage.getProducts();
    const o = erpStorage.getOrders();
    const s = erpStorage.getStaff();
    const v = erpStorage.getVehicles();
    const d = erpStorage.getDispatches();
    const inq = erpStorage.getInquiries();

    setProducts(p);
    setOrders(o);
    setStaff(s);
    setVehicles(v);
    setDispatches(d);
    setInquiries(inq);

    // Default to Folake Adeyemi if not set
    if (!activeStaff && s.length > 0) {
      const folake = s.find((st) => st.name.includes('Folake')) || s[0];
      setActiveStaff(folake);
    }
  };

  useEffect(() => {
    loadErpData();

    const handleUpdate = () => {
      loadErpData();
    };

    window.addEventListener('elim_erp_updated', handleUpdate);
    return () => window.removeEventListener('elim_erp_updated', handleUpdate);
  }, []);

  // Save Cart to Local Storage
  useEffect(() => {
    try {
      localStorage.setItem('elim_water_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Cart Operations
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === product.id && i.variantId === variant.id
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
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
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, variantId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (newOrder: OnlineOrder) => {
    // Clear cart on successful order
    setCartItems([]);
    loadErpData();
  };

  const handleOpenTrackingWithDetails = (ref: string, phone: string) => {
    setTrackingInitialRef(ref);
    setTrackingInitialPhone(phone);
    setIsTrackingModalOpen(true);
  };

  const handleOpenDispatchForOrder = (order: OnlineOrder) => {
    setSelectedOrderForDetail(null);
    setTargetOrderForDispatch(order);
    setCurrentAdminTab('dispatch');
  };

  const newBookingsCount = orders.filter((o) => o.status === 'NEW').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-cyan-500 selection:text-white">
      {isAdminMode && activeStaff ? (
        /* ================= ERP ADMINISTRATIVE & DISPATCH CONTROL DESK ================= */
        <AdminLayout
          currentTab={currentAdminTab}
          onSelectTab={setCurrentAdminTab}
          onExitAdmin={() => setIsAdminMode(false)}
          activeStaff={activeStaff}
          onChangeActiveStaff={setActiveStaff}
          newBookingsCount={newBookingsCount}
        >
          {currentAdminTab === 'dashboard' && (
            <AdminDashboard
              orders={orders}
              products={products}
              staff={staff}
              onOpenOrder={(ord) => setSelectedOrderForDetail(ord)}
              onNavigateTab={setCurrentAdminTab}
            />
          )}

          {currentAdminTab === 'inbox' && (
            <OrderInbox
              orders={orders}
              staff={staff}
              onOpenOrder={(ord) => setSelectedOrderForDetail(ord)}
            />
          )}

          {currentAdminTab === 'workspace' && (
            <StaffWorkspace
              orders={orders}
              activeOperator={activeStaff}
              onOpenOrder={(ord) => setSelectedOrderForDetail(ord)}
            />
          )}

          {currentAdminTab === 'dispatch' && (
            <DispatchManagement
              dispatches={dispatches}
              orders={orders}
              vehicles={vehicles}
              staff={staff}
              activeOperator={activeStaff}
              onRefresh={loadErpData}
              targetOrderForDispatch={targetOrderForDispatch}
              onClearTargetOrder={() => setTargetOrderForDispatch(null)}
            />
          )}

          {currentAdminTab === 'inventory' && (
            <ErpInventoryLedger
              products={products}
              activeOperator={activeStaff}
              onRefresh={loadErpData}
            />
          )}

          {currentAdminTab === 'inquiries' && (
            <InquiriesAdmin
              inquiries={inquiries}
              activeOperator={activeStaff}
              onRefresh={loadErpData}
            />
          )}

          {currentAdminTab === 'content' && <ContentAdmin />}

          {currentAdminTab === 'audit' && <AuditLogsAdmin orders={orders} />}

          {/* Order Detail Drawer */}
          <OrderDetailDrawer
            order={selectedOrderForDetail}
            onClose={() => setSelectedOrderForDetail(null)}
            staff={staff}
            activeOperator={activeStaff}
            onOrderUpdated={loadErpData}
            onOpenDispatchModal={handleOpenDispatchForOrder}
          />
        </AdminLayout>
      ) : (
        /* ================= PUBLIC CORPORATE WEBSITE & ORDERING PORTAL ================= */
        <div className="flex-1 flex flex-col w-full">
          <Navbar
            currentTab={currentPublicTab}
            onNavigate={(tab) => {
              setCurrentPublicTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cartItems={cartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenTracking={() => setIsTrackingModalOpen(true)}
            onSwitchToAdmin={() => setIsAdminMode(true)}
            isStaffMode={isAdminMode}
          />

          <main className="flex-1 w-full">
            {currentPublicTab === 'home' && (
              <HomePage
                products={products}
                onAddToCart={handleAddToCart}
                onViewProductDetails={(p) => setSelectedProductForDetail(p)}
                onNavigate={(tab) => {
                  setCurrentPublicTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenTracking={() => setIsTrackingModalOpen(true)}
              />
            )}

            {currentPublicTab === 'about' && (
              <AboutPage
                onNavigate={(tab) => {
                  setCurrentPublicTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentPublicTab === 'operations' && (
              <OperationsPage
                onNavigate={(tab) => {
                  setCurrentPublicTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentPublicTab === 'products' && (
              <ProductsPage
                products={products}
                onAddToCart={handleAddToCart}
                onViewProductDetails={(p) => setSelectedProductForDetail(p)}
              />
            )}

            {currentPublicTab === 'news' && <NewsPage />}

            {currentPublicTab === 'gallery' && <GalleryPage />}

            {currentPublicTab === 'contact' && <ContactPage />}
          </main>

          <Footer
            onNavigate={(tab) => {
              setCurrentPublicTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTracking={() => setIsTrackingModalOpen(true)}
            onOpenDistributorForm={() => {
              setCurrentPublicTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Cart Slide-Over Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            deliveryMethod={deliveryMethod}
            onChangeDeliveryMethod={setDeliveryMethod}
            onProceedToCheckout={handleProceedToCheckout}
          />

          {/* Customer Online Booking Checkout Modal */}
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            items={cartItems}
            deliveryMethod={deliveryMethod}
            onOrderCompleted={handleOrderCompleted}
            onTrackOrder={handleOpenTrackingWithDetails}
          />

          {/* Product Detail Modal */}
          <ProductDetailModal
            product={selectedProductForDetail}
            onClose={() => setSelectedProductForDetail(null)}
            onAddToCart={handleAddToCart}
          />

          {/* Order Tracking Modal */}
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
      )}
    </div>
  );
}
