/**
 * ==========================================================================
 * NOVA STORE - Core Interactive JavaScript
 * ==========================================================================
 * Features:
 * 1. Product Catalog Data & Dynamic Rendering
 * 2. Shopping Cart Management (Add, Remove, Quantity Adjust, Subtotal, Storage)
 * 3. Product Wishlist Toggle & Persistence
 * 4. Real-time Product Search & Category Filtering
 * 5. Product Quick View Modal with Full Specs
 * 6. Newsletter Form Email Validation & Feedback
 * 7. Interactive Toast Notification System
 * 8. Promotional Flash Sale Countdown Timer
 * 9. Mobile Navbar Auto-collapse & Back-to-Top Button
 * 10. Dynamic Copyright Year
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. PRODUCT CATALOG DATA
  // =========================================================================
  const PRODUCTS = [
    {
      id: 1,
      name: "Minimalist Linen Overshirt",
      category: "Men's Fashion",
      price: 68.00,
      originalPrice: 85.00,
      discount: "20% OFF",
      rating: 4.8,
      reviews: 42,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-mens.svg",
      description: "Crafted from 100% breathable European flax linen with a modern relaxed cut. Ideal for layering across seasons."
    },
    {
      id: 2,
      name: "Tailored Wool Blend Blazer",
      category: "Men's Fashion",
      price: 145.00,
      originalPrice: 190.00,
      discount: "24% OFF",
      rating: 4.9,
      reviews: 68,
      badge: "BESTSELLER",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-mens.svg",
      description: "Structured slim-fit silhouette designed for effortless elegance from executive meetings to evening dinner events."
    },
    {
      id: 3,
      name: "Heavyweight Cotton Crewneck",
      category: "Men's Fashion",
      price: 42.00,
      originalPrice: 52.00,
      discount: "",
      rating: 4.7,
      reviews: 31,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-mens.svg",
      description: "Pre-shrunk 380gsm organic heavyweight French terry cotton with reinforced ribbed trims and ultra-soft fleece interior."
    },
    {
      id: 4,
      name: "Silk Blend Slip Midi Dress",
      category: "Women's Fashion",
      price: 89.00,
      originalPrice: 120.00,
      discount: "25% OFF",
      rating: 4.9,
      reviews: 84,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-womens.svg",
      description: "Fluid bias-cut silk satin that drapes gracefully over contours with delicate adjustable spaghetti straps."
    },
    {
      id: 5,
      name: "Structured Belted Trench Coat",
      category: "Women's Fashion",
      price: 165.00,
      originalPrice: 210.00,
      discount: "21% OFF",
      rating: 5.0,
      reviews: 52,
      badge: "LUXE",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-womens.svg",
      description: "Water-resistant double-breasted cotton gabardine featuring storm flap, tortoiseshell buttons, and tie waist belt."
    },
    {
      id: 6,
      name: "Cashmere Ribbed Knit Cardigan",
      category: "Women's Fashion",
      price: 95.00,
      originalPrice: 115.00,
      discount: "17% OFF",
      rating: 4.8,
      reviews: 29,
      badge: "",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-womens.svg",
      description: "Sumptuous Grade-A Mongolian cashmere with tactile ribbing and horn buttons for cozy everyday luxury."
    },
    {
      id: 7,
      name: "Minimalist Leather Court Sneakers",
      category: "Shoes",
      price: 110.00,
      originalPrice: 140.00,
      discount: "21% OFF",
      rating: 4.9,
      reviews: 112,
      badge: "BESTSELLER",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-shoes.svg",
      description: "Full-grain Italian calfskin leather with reinforced heel support and durable stitched Margom-style rubber cupsole."
    },
    {
      id: 8,
      name: "Classic Suede Chelsea Boots",
      category: "Shoes",
      price: 135.00,
      originalPrice: 175.00,
      discount: "22% OFF",
      rating: 4.8,
      reviews: 76,
      badge: "HOT",
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-shoes.svg",
      description: "Hand-finished water-repellent suede with flexible elastic side gussets and Goodyear-welted studded rubber sole."
    },
    {
      id: 9,
      name: "Perforated Driving Loafers",
      category: "Shoes",
      price: 85.00,
      originalPrice: 105.00,
      discount: "",
      rating: 4.6,
      reviews: 19,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-shoes.svg",
      description: "Supple glove-tanned leather moccasin construction with pebble rubber grip sole for driving and summer leisure."
    },
    {
      id: 10,
      name: "Italian Pebble Leather Crossbody",
      category: "Accessories",
      price: 78.00,
      originalPrice: 98.00,
      discount: "20% OFF",
      rating: 4.9,
      reviews: 63,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-accessories.svg",
      description: "Structured scratch-resistant pebble-grain leather with gold-tone hardware, secure zip compartment, and adjustable strap."
    },
    {
      id: 11,
      name: "Aviator Polarized Sunglasses",
      category: "Accessories",
      price: 55.00,
      originalPrice: 70.00,
      discount: "21% OFF",
      rating: 4.7,
      reviews: 45,
      badge: "",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-accessories.svg",
      description: "Ultralight titanium alloy frame with UV400 anti-glare polarized gradient lenses and comfortable silicone nose pads."
    },
    {
      id: 12,
      name: "Chronograph Minimalist Gold Watch",
      category: "Accessories",
      price: 125.00,
      originalPrice: 160.00,
      discount: "22% OFF",
      rating: 5.0,
      reviews: 88,
      badge: "LUXE",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
      fallback: "assets/images/cat-accessories.svg",
      description: "Brushed 316L gold-plated stainless steel casing with sapphire crystal glass and genuine top-grain calfskin leather strap."
    }
  ];

  // =========================================================================
  // 2. STATE MANAGEMENT (LocalStorage Persistence)
  // =========================================================================
  let cart = loadFromStorage('nova_cart', []);
  let wishlist = loadFromStorage('nova_wishlist', []);
  let currentCategory = 'all';
  let currentSearchQuery = '';

  function loadFromStorage(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing ${key} to localStorage:`, e);
    }
  }

  // =========================================================================
  // 3. RENDER PRODUCTS GRID
  // =========================================================================
  const productsContainer = document.getElementById('productsContainer');
  const noProductsMsg = document.getElementById('noProductsMessage');
  const productsCountBadge = document.getElementById('productsCountBadge');

  function renderProducts() {
    if (!productsContainer) return;

    // Filter products based on selected category and search query
    const filtered = PRODUCTS.filter(p => {
      const matchCat = (currentCategory === 'all') || (p.category.toLowerCase() === currentCategory.toLowerCase());
      const matchSearch = currentSearchQuery === '' || 
        p.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(currentSearchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    // Update count indicator
    if (productsCountBadge) {
      productsCountBadge.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
    }

    if (filtered.length === 0) {
      productsContainer.innerHTML = '';
      if (noProductsMsg) noProductsMsg.classList.remove('d-none');
      return;
    }

    if (noProductsMsg) noProductsMsg.classList.add('d-none');

    // Build product cards HTML
    productsContainer.innerHTML = filtered.map(product => {
      const isWishlisted = wishlist.includes(product.id);
      
      // Badges HTML
      let badgeHtml = '';
      if (product.discount) {
        badgeHtml += `<span class="product-badge badge-discount">${product.discount}</span>`;
      }
      if (product.badge && product.badge !== 'SALE') {
        const badgeClass = product.badge === 'NEW' ? 'badge-new' : 'badge-popular';
        badgeHtml += `<span class="product-badge ${badgeClass}">${product.badge}</span>`;
      }

      return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
          <div class="product-card" data-id="${product.id}">
            
            <!-- Product Image Wrap -->
            <div class="product-image-container">
              <div class="product-badge-wrap">
                ${badgeHtml}
              </div>

              <!-- Wishlist Heart Button -->
              <button type="button" class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
                      data-id="${product.id}" 
                      aria-label="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                <i class="bi bi-heart${isWishlisted ? '-fill' : ''}"></i>
              </button>

              <!-- Image with SVG fallback on error -->
              <img src="${product.image}" 
                   alt="${product.name}" 
                   loading="lazy" 
                   onerror="this.onerror=null; this.src='${product.fallback}';">

              <!-- Quick View Trigger Button -->
              <button type="button" class="btn-quickview-trigger" data-id="${product.id}">
                <i class="bi bi-eye me-1"></i> Quick View
              </button>
            </div>

            <!-- Product Details Body -->
            <div class="product-details">
              <span class="product-category">${product.category}</span>
              
              <h4 class="product-name" data-id="${product.id}">${product.name}</h4>

              <div class="product-rating">
                ${renderStars(product.rating)}
                <span class="review-count">(${product.reviews})</span>
              </div>

              <div class="product-price-row">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
              </div>

              <!-- Add to Cart Button -->
              <button type="button" class="btn-add-cart" data-id="${product.id}">
                <i class="bi bi-bag-plus"></i> Add to Cart
              </button>
            </div>

          </div>
        </div>
      `;
    }).join('');

    attachProductCardEvents();
  }

  function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars += '<i class="bi bi-star-fill"></i>';
    if (hasHalf) stars += '<i class="bi bi-star-half"></i>';
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) stars += '<i class="bi bi-star"></i>';

    return stars;
  }

  // =========================================================================
  // 4. ATTACH EVENTS ON PRODUCT CARDS
  // =========================================================================
  function attachProductCardEvents() {
    // Add to Cart Buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        addToCart(id, 1);
      });
    });

    // Wishlist Toggle Buttons
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        toggleWishlist(id, btn);
      });
    });

    // Quick View Buttons & Product Names
    document.querySelectorAll('.btn-quickview-trigger, .product-name').forEach(el => {
      el.addEventListener('click', () => {
        const id = parseInt(el.getAttribute('data-id'), 10);
        openQuickViewModal(id);
      });
    });
  }

  // =========================================================================
  // 5. SHOPPING CART LOGIC
  // =========================================================================
  const cartCounterBadges = document.querySelectorAll('.cart-badge');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartShippingEl = document.getElementById('cartShipping');
  const cartTotalEl = document.getElementById('cartTotal');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      showToast('Product not found or invalid.', 'error');
      return;
    }

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        fallback: product.fallback,
        category: product.category,
        quantity: quantity
      });
    }

    saveToStorage('nova_cart', cart);
    updateCartUI();
    showToast(`Added "${product.name}" (${quantity}) to your shopping bag!`, 'success');
  }

  function removeFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    saveToStorage('nova_cart', cart);
    updateCartUI();
    if (item) {
      showToast(`Removed "${item.name}" from your bag.`, 'info');
    }
  }

  function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveToStorage('nova_cart', cart);
      updateCartUI();
    }
  }

  function updateCartUI() {
    // Total count of units
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCounterBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = '';
      if (cartEmptyState) cartEmptyState.classList.remove('d-none');
      if (clearCartBtn) clearCartBtn.disabled = true;
      if (checkoutBtn) checkoutBtn.disabled = true;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
      if (cartShippingEl) cartShippingEl.textContent = '$0.00';
      if (cartTotalEl) cartTotalEl.textContent = '$0.00';
      return;
    }

    if (cartEmptyState) cartEmptyState.classList.add('d-none');
    if (clearCartBtn) clearCartBtn.disabled = false;
    if (checkoutBtn) checkoutBtn.disabled = false;

    // Render cart items
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='${item.fallback}';">
        <div class="cart-item-info">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="cart-item-title">${item.name}</h5>
            <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="qty-control">
              <button class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <span class="text-muted small">Sub: $${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners to cart item controls
    cartItemsList.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        removeFromCart(id);
      });
    });

    cartItemsList.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        updateQuantity(id, -1);
      });
    });

    cartItemsList.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        updateQuantity(id, 1);
      });
    });

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Free shipping over $100, otherwise $10 flat rate
    const shipping = subtotal >= 100 || subtotal === 0 ? 0.00 : 10.00;
    const total = subtotal + shipping;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartShippingEl) {
      cartShippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
      cartShippingEl.className = shipping === 0 ? 'text-success fw-bold' : '';
    }
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  // Clear Cart Action
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      if (confirm('Are you sure you want to clear all items from your shopping bag?')) {
        cart = [];
        saveToStorage('nova_cart', cart);
        updateCartUI();
        showToast('Shopping cart has been cleared.', 'info');
      }
    });
  }

  // Checkout Action Simulation
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Simulate quick processing
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing Order...';

      setTimeout(() => {
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = '<i class="bi bi-lock-fill me-2"></i> Proceed to Checkout';
        
        // Hide offcanvas
        const cartOffcanvasEl = document.getElementById('cartOffcanvas');
        if (cartOffcanvasEl && window.bootstrap) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
          if (bsOffcanvas) bsOffcanvas.hide();
        }

        // Show celebration toast
        showToast(`🎉 Order Placed Successfully! Total: $${total.toFixed(2)}. Thank you for shopping with NOVA STORE!`, 'success');

        // Reset cart
        cart = [];
        saveToStorage('nova_cart', cart);
        updateCartUI();
      }, 1200);
    });
  }

  // =========================================================================
  // 6. WISHLIST MANAGEMENT
  // =========================================================================
  const wishlistCounterBadges = document.querySelectorAll('.wishlist-badge');

  function toggleWishlist(productId, btnElement) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.indexOf(productId);
    let isAdded = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      if (btnElement) {
        btnElement.classList.remove('active');
        btnElement.innerHTML = '<i class="bi bi-heart"></i>';
      }
      showToast(`Removed "${product.name}" from your wishlist.`, 'info');
    } else {
      wishlist.push(productId);
      isAdded = true;
      if (btnElement) {
        btnElement.classList.add('active');
        btnElement.innerHTML = '<i class="bi bi-heart-fill"></i>';
      }
      showToast(`Saved "${product.name}" to your wishlist!`, 'success');
    }

    saveToStorage('nova_wishlist', wishlist);
    updateWishlistUI();
  }

  function updateWishlistUI() {
    wishlistCounterBadges.forEach(badge => {
      badge.textContent = wishlist.length;
      badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });

    // Re-sync all wishlist button states across rendered cards
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const isFav = wishlist.includes(id);
      if (isFav) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-heart"></i>';
      }
    });

    renderWishlistOffcanvas();
  }

  function renderWishlistOffcanvas() {
    const wishlistItemsList = document.getElementById('wishlistItemsList');
    const wishlistEmptyState = document.getElementById('wishlistEmptyState');
    if (!wishlistItemsList) return;

    if (wishlist.length === 0) {
      wishlistItemsList.innerHTML = '';
      if (wishlistEmptyState) wishlistEmptyState.classList.remove('d-none');
      return;
    }

    if (wishlistEmptyState) wishlistEmptyState.classList.add('d-none');

    const favoriteProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

    wishlistItemsList.innerHTML = favoriteProducts.map(p => `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img" onerror="this.src='${p.fallback}';">
        <div class="cart-item-info">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="cart-item-title">${p.name}</h5>
            <button class="btn-remove-item btn-remove-wishlist" data-id="${p.id}" aria-label="Remove from wishlist">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="cart-item-price">$${p.price.toFixed(2)}</div>
          <div class="mt-2">
            <button class="btn btn-sm btn-nova-primary py-1 px-3 w-100 btn-wishlist-add-cart" data-id="${p.id}">
              <i class="bi bi-bag-plus me-1"></i> Move to Bag
            </button>
          </div>
        </div>
      </div>
    `).join('');

    wishlistItemsList.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        toggleWishlist(id);
      });
    });

    wishlistItemsList.querySelectorAll('.btn-wishlist-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        addToCart(id, 1);
        toggleWishlist(id); // remove from wishlist after moving
      });
    });
  }

  // =========================================================================
  // 7. PRODUCT SEARCH & CATEGORY FILTERING
  // =========================================================================
  const searchInput = document.getElementById('productSearchInput');
  const searchForm = document.getElementById('productSearchForm');
  const categoryFilterBtns = document.querySelectorAll('.filter-btn');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  // Real-time search with input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.blur();
    });
  }

  // Category filter tabs
  categoryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = btn.getAttribute('data-category') || 'all';
      renderProducts();
    });
  });

  // Category cards in category section (links that auto-filter products)
  document.querySelectorAll('.cat-card-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = link.getAttribute('data-target-cat');
      if (!targetCat) return;

      currentCategory = targetCat;

      // Update filter pills active state
      categoryFilterBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === targetCat) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      renderProducts();

      // Smooth scroll to products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Reset Filters Button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      if (searchInput) searchInput.value = '';

      categoryFilterBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') btn.classList.add('active');
        else btn.classList.remove('active');
      });

      renderProducts();
    });
  }

  // =========================================================================
  // 8. PRODUCT QUICK VIEW MODAL
  // =========================================================================
  const quickViewModalEl = document.getElementById('quickViewModal');
  let quickViewModalInstance = null;
  if (quickViewModalEl && window.bootstrap) {
    quickViewModalInstance = new bootstrap.Modal(quickViewModalEl);
  }

  function openQuickViewModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickViewModalEl) return;

    // Populate modal fields
    const qvImg = document.getElementById('qvProductImg');
    const qvCategory = document.getElementById('qvProductCategory');
    const qvName = document.getElementById('qvProductName');
    const qvPrice = document.getElementById('qvProductPrice');
    const qvOriginalPrice = document.getElementById('qvProductOriginalPrice');
    const qvDiscount = document.getElementById('qvProductDiscount');
    const qvDescription = document.getElementById('qvProductDesc');
    const qvRating = document.getElementById('qvProductRating');
    const qvReviews = document.getElementById('qvProductReviews');
    const qvQtyInput = document.getElementById('qvQuantityInput');
    const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');
    const qvWishlistBtn = document.getElementById('qvWishlistBtn');

    if (qvImg) {
      qvImg.src = product.image;
      qvImg.alt = product.name;
      qvImg.onerror = () => { qvImg.src = product.fallback; };
    }
    if (qvCategory) qvCategory.textContent = product.category;
    if (qvName) qvName.textContent = product.name;
    if (qvPrice) qvPrice.textContent = `$${product.price.toFixed(2)}`;
    if (qvOriginalPrice) {
      if (product.originalPrice) {
        qvOriginalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
        qvOriginalPrice.style.display = 'inline';
      } else {
        qvOriginalPrice.style.display = 'none';
      }
    }
    if (qvDiscount) {
      if (product.discount) {
        qvDiscount.textContent = product.discount;
        qvDiscount.style.display = 'inline-block';
      } else {
        qvDiscount.style.display = 'none';
      }
    }
    if (qvDescription) qvDescription.textContent = product.description;
    if (qvRating) qvRating.innerHTML = renderStars(product.rating);
    if (qvReviews) qvReviews.textContent = `(${product.reviews} customer reviews)`;
    if (qvQtyInput) qvQtyInput.value = 1;

    // Wishlist state inside modal
    const isWishlisted = wishlist.includes(product.id);
    if (qvWishlistBtn) {
      qvWishlistBtn.className = `btn btn-nova-outline px-3 ${isWishlisted ? 'text-danger border-danger' : ''}`;
      qvWishlistBtn.innerHTML = `<i class="bi bi-heart${isWishlisted ? '-fill' : ''} me-1"></i> ${isWishlisted ? 'Saved' : 'Wishlist'}`;
      
      qvWishlistBtn.onclick = () => {
        toggleWishlist(product.id);
        const updated = wishlist.includes(product.id);
        qvWishlistBtn.className = `btn btn-nova-outline px-3 ${updated ? 'text-danger border-danger' : ''}`;
        qvWishlistBtn.innerHTML = `<i class="bi bi-heart${updated ? '-fill' : ''} me-1"></i> ${updated ? 'Saved' : 'Wishlist'}`;
      };
    }

    // Add to Cart inside modal
    if (qvAddToCartBtn) {
      qvAddToCartBtn.onclick = () => {
        const qty = parseInt(qvQtyInput.value, 10) || 1;
        addToCart(product.id, Math.max(1, qty));
        if (quickViewModalInstance) quickViewModalInstance.hide();
      };
    }

    // Modal size & color selectors
    document.querySelectorAll('.size-pill').forEach(pill => {
      pill.onclick = () => {
        document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      };
    });

    document.querySelectorAll('.color-circle').forEach(circle => {
      circle.onclick = () => {
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
        circle.classList.add('active');
      };
    });

    // Quantity buttons in modal
    const qvMinus = document.getElementById('qvQtyMinus');
    const qvPlus = document.getElementById('qvQtyPlus');
    if (qvMinus && qvQtyInput) {
      qvMinus.onclick = () => {
        let val = parseInt(qvQtyInput.value, 10) || 1;
        if (val > 1) qvQtyInput.value = val - 1;
      };
    }
    if (qvPlus && qvQtyInput) {
      qvPlus.onclick = () => {
        let val = parseInt(qvQtyInput.value, 10) || 1;
        qvQtyInput.value = val + 1;
      };
    }

    if (quickViewModalInstance) quickViewModalInstance.show();
  }

  // =========================================================================
  // 9. NEWSLETTER FORM VALIDATION
  // =========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterSuccess = document.getElementById('newsletterSuccess');
  const newsletterError = document.getElementById('newsletterError');

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();

      // Reset messages
      if (newsletterSuccess) newsletterSuccess.classList.remove('show-success');
      if (newsletterError) newsletterError.classList.remove('show-error');
      newsletterEmail.classList.remove('is-invalid', 'is-valid');

      if (email === '') {
        if (newsletterError) {
          newsletterError.textContent = 'Please enter your email address.';
          newsletterError.classList.add('show-error');
        }
        newsletterEmail.classList.add('is-invalid');
        newsletterEmail.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        if (newsletterError) {
          newsletterError.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
          newsletterError.classList.add('show-error');
        }
        newsletterEmail.classList.add('is-invalid');
        newsletterEmail.focus();
        return;
      }

      // Valid! Simulate subscription
      newsletterEmail.classList.add('is-valid');
      if (newsletterSuccess) {
        newsletterSuccess.textContent = `Welcome to the NOVA Club! An exclusive 15% welcome code has been dispatched to ${email}.`;
        newsletterSuccess.classList.add('show-success');
      }

      showToast(`Subscribed successfully! Welcome to NOVA STORE.`, 'success');
      newsletterEmail.value = '';

      // Auto dismiss success feedback after 7 seconds
      setTimeout(() => {
        if (newsletterSuccess) newsletterSuccess.classList.remove('show-success');
        newsletterEmail.classList.remove('is-valid');
      }, 7000);
    });

    // Clear error on input
    newsletterEmail.addEventListener('input', () => {
      if (newsletterError) newsletterError.classList.remove('show-error');
      newsletterEmail.classList.remove('is-invalid');
    });
  }

  // =========================================================================
  // 10. PROMOTIONAL COUNTDOWN TIMER
  // =========================================================================
  const hoursEl = document.getElementById('countdownHours');
  const minsEl = document.getElementById('countdownMins');
  const secsEl = document.getElementById('countdownSecs');

  if (hoursEl && minsEl && secsEl) {
    // 8 hours, 45 mins countdown from now
    let remainingSeconds = 8 * 3600 + 45 * 60 + 20;

    function tickTimer() {
      if (remainingSeconds <= 0) {
        remainingSeconds = 12 * 3600; // Reset loop
      }
      remainingSeconds--;

      const h = Math.floor(remainingSeconds / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }

    tickTimer();
    setInterval(tickTimer, 1000);
  }

  // =========================================================================
  // 11. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center border-0 shadow-lg mb-2';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    let bgClass = 'bg-dark text-white';
    let icon = '<i class="bi bi-check-circle-fill text-warning me-2 fs-5"></i>';

    if (type === 'error') {
      bgClass = 'bg-danger text-white';
      icon = '<i class="bi bi-exclamation-triangle-fill text-white me-2 fs-5"></i>';
    } else if (type === 'info') {
      bgClass = 'bg-secondary text-white';
      icon = '<i class="bi bi-info-circle-fill text-white me-2 fs-5"></i>';
    }

    toastEl.classList.add(...bgClass.split(' '));

    toastEl.innerHTML = `
      <div class="d-flex p-2 align-items-center">
        <div class="toast-body d-flex align-items-center fs-6">
          ${icon}
          <div>${message}</div>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    container.appendChild(toastEl);

    if (window.bootstrap) {
      const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    } else {
      setTimeout(() => toastEl.remove(), 4000);
    }
  }

  // =========================================================================
  // 12. NAVBAR SCROLL EFFECT & MOBILE MENU AUTO-COLLAPSE
  // =========================================================================
  const navbar = document.querySelector('.nova-navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (navbar) {
      if (scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollY > 300) backToTopBtn.classList.add('show');
      else backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Collapse mobile navbar on link click
  const navCollapse = document.getElementById('navbarContent');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.bootstrap && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // =========================================================================
  // 13. DYNAMIC COPYRIGHT YEAR
  // =========================================================================
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 14. INITIALIZE APP
  // =========================================================================
  renderProducts();
  updateCartUI();
  updateWishlistUI();
});
