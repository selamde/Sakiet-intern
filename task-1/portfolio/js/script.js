/**
 * Personal Portfolio Website - Core JavaScript
 * Features:
 * - Dynamic Current Year
 * - Responsive Mobile Navigation Menu
 * - Smooth Scrolling to Sections
 * - Active Navigation Spy (IntersectionObserver)
 * - Skills Category Filter
 * - Comprehensive Contact Form Validation & Simulated Submission
 * - Toast Notification System
 * - Back to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Dynamic Copyright Year
  // =========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 2. Mobile Navigation Menu Toggle
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIconOpen = document.getElementById('menuIconOpen');
  const menuIconClose = document.getElementById('menuIconClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    menuIconOpen.classList.add('hidden');
    menuIconClose.classList.remove('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking any mobile nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });
  }

  // =========================================================================
  // 3. Smooth Scrolling with Offset for Sticky Header
  // =========================================================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const navbar = document.getElementById('mainNavbar');
  const navHeight = navbar ? navbar.offsetHeight : 70;

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          closeMobileMenu();
        }
      }
    });
  });

  // =========================================================================
  // 4. Active Navigation Link Highlighting (Scroll Spy)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navHeight - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Desktop links
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        // Mobile links
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink(); // Initial check on page load

  // =========================================================================
  // 5. Navbar Scrolled Shadow & Backdrop Styling
  // =========================================================================
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-lg', 'border-b', 'border-slate-800/80', 'bg-[#0B0F19]/90');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // =========================================================================
  // 6. Skills Category Filter
  // =========================================================================
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (skillFilterBtns.length > 0 && skillCards.length > 0) {
    skillFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all filter buttons
        skillFilterBtns.forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white', 'shadow-indigo-500/25');
          b.classList.add('bg-slate-800/60', 'text-slate-300');
        });

        // Add active style to selected button
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-indigo-500/25');
        btn.classList.remove('bg-slate-800/60', 'text-slate-300');

        const category = btn.getAttribute('data-category');

        // Filter cards with smooth opacity transition
        skillCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // 7. Contact Form Validation & Simulated Submission
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtnSpinner = document.getElementById('submitBtnSpinner');

  // Input elements
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Validation Rules
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
      showError(nameInput, nameError, 'Full name is required.');
      return false;
    } else if (value.length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === '') {
      showError(emailInput, emailError, 'Email address is required.');
      return false;
    } else if (!emailRegex.test(value)) {
      showError(emailInput, emailError, 'Please enter a valid email address (e.g. name@example.com).');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (value === '') {
      showError(subjectInput, subjectError, 'Subject is required.');
      return false;
    } else if (value.length < 3) {
      showError(subjectInput, subjectError, 'Subject must be at least 3 characters.');
      return false;
    }
    clearError(subjectInput, subjectError);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
      showError(messageInput, messageError, 'Message cannot be empty.');
      return false;
    } else if (value.length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters.');
      return false;
    }
    clearError(messageInput, messageError);
    return true;
  }

  function showError(input, errorElement, message) {
    input.classList.add('input-error');
    input.classList.remove('input-success');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, errorElement) {
    input.classList.remove('input-error');
    input.classList.add('input-success');
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
    input.setAttribute('aria-invalid', 'false');
  }

  // Real-time validation listeners on blur and input
  if (nameInput) {
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('input-error')) validateName();
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) validateEmail();
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.classList.contains('input-error')) validateSubject();
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('input-error')) validateMessage();
    });
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Run all validations
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!isFormValid) {
        // Focus first invalid field
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isSubjectValid) subjectInput.focus();
        else if (!isMessageValid) messageInput.focus();

        showToast('Please correct the errors in the form before submitting.', 'error');
        return;
      }

      // Simulate sending with loading state
      const userName = nameInput.value.trim();
      setLoadingState(true);

      setTimeout(() => {
        setLoadingState(false);

        // Display success banner
        if (formSuccessBanner) {
          formSuccessBanner.classList.remove('hidden');
          // Update personalized name in success banner if present
          const successNameSpan = document.getElementById('successUserName');
          if (successNameSpan) successNameSpan.textContent = userName;
        }

        // Show floating toast
        showToast(`Thank you, ${userName}! Your message was sent successfully.`, 'success');

        // Reset form inputs & styles
        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
          if (input) {
            input.classList.remove('input-success', 'input-error');
            input.removeAttribute('aria-invalid');
          }
        });

        // Hide success banner automatically after 8 seconds
        setTimeout(() => {
          if (formSuccessBanner) {
            formSuccessBanner.classList.add('hidden');
          }
        }, 8000);

      }, 1000); // 1-second simulated delay
    });
  }

  function setLoadingState(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (isLoading) {
      submitBtnText.textContent = 'Sending Message...';
      submitBtnSpinner.classList.remove('hidden');
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
      submitBtnText.textContent = 'Send Message';
      submitBtnSpinner.classList.add('hidden');
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
  }

  // =========================================================================
  // 8. Toast Notification System
  // =========================================================================
  function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-11/12 max-w-md pointer-events-none';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    
    toast.className = `toast-enter pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-center justify-between gap-3 text-sm font-medium ${
      isSuccess 
        ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-300 shadow-emerald-500/10' 
        : 'bg-slate-900/95 border-rose-500/50 text-rose-300 shadow-rose-500/10'
    } backdrop-blur-md`;

    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
          ${isSuccess ? '✓' : '!'}
        </span>
        <span>${message}</span>
      </div>
      <button class="text-slate-400 hover:text-white text-lg leading-none focus:outline-none" aria-label="Dismiss">&times;</button>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector('button');
    const removeToast = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    };

    closeBtn.addEventListener('click', removeToast);
    setTimeout(removeToast, 5000);
  }

  // =========================================================================
  // 9. Back to Top Button
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hide');
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
        backToTopBtn.classList.add('hide');
      }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop(); // Initial check

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 10. Project Action Buttons (Demo / GitHub simulation)
  // =========================================================================
  const demoButtons = document.querySelectorAll('.project-demo-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectName = btn.getAttribute('data-project') || 'this project';
      showToast(`Launching live interactive preview for ${projectName}...`, 'success');
    });
  });

  const repoButtons = document.querySelectorAll('.project-repo-btn');
  repoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectName = btn.getAttribute('data-project') || 'this project';
      showToast(`Navigating to GitHub repository for ${projectName}...`, 'success');
    });
  });
});



//component loader
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    const html = await response.text();

    document.getElementById(id).innerHTML = html;

  } catch (error) {
    console.error(error);
  }
}

async function loadPage() {
  await Promise.all([
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("hero", "components/hero.html"),
    loadComponent("about", "components/about.html"),
    loadComponent("skills", "components/skills.html"),
    loadComponent("projects", "components/projects.html"),
    loadComponent("contact", "components/contact.html"),
    loadComponent("footer", "components/footer.html"),
  ]);

   initializeSkills();

  // Initialize event listeners after components load
  initializeWebsite();

   
}

loadPage();

//Skills
function initializeSkills() {
  const TICKS = 20;

  const rows = document.querySelectorAll('#skills .skill-row');
  const btns = document.querySelectorAll('#skills .skill-filter-btn');

  // Build skill level meters
  rows.forEach(function (row) {
    const lit = Math.round(Number(row.dataset.level) / 100 * TICKS);
    const meter = row.querySelector('.skill-meter');

    if (!meter || meter.children.length > 0) return;

    for (let i = 0; i < TICKS; i++) {
      const tick = document.createElement('span');

      tick.className = 'flex-1 rounded-[1px] ' +
        (i < lit ? 'bg-indigo-400' : 'bg-slate-800');

      meter.appendChild(tick);
    }
  });

  // Category counts
  btns.forEach(function (btn) {
    const category = btn.dataset.category;

    const count = category === 'all'
      ? rows.length
      : document.querySelectorAll(
          `#skills .skill-row[data-category="${category}"]`
        ).length;

    const countElement = btn.querySelector('.skill-count');

    if (countElement) {
      countElement.textContent = count;
    }
  });

  // Active filter
  function setActive(activeBtn) {
    btns.forEach(function (btn) {
      const active = btn === activeBtn;

      btn.setAttribute('aria-selected', String(active));

      btn.classList.toggle('bg-indigo-500/15', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('ring-1', active);
      btn.classList.toggle('ring-indigo-400/40', active);
      btn.classList.toggle('text-slate-400', !active);
      btn.classList.toggle('hover:text-white', !active);
    });
  }

  // Filter skills
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = btn.dataset.category;

      rows.forEach(function (row) {
        row.classList.toggle(
          'hidden',
          category !== 'all' && row.dataset.category !== category
        );
      });

      setActive(btn);
    });
  });

  if (btns.length > 0) {
    setActive(btns[0]);
  }
}

