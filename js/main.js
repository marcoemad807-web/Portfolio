/* ==========================================================================
   Modern Developer Portfolio JavaScript
   Handles interactive navigation, project modals, skill filtering, & copy-to-clipboard
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollProgress();
  initSkillFilters();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initActiveNavHighlight();
  initCertificatePreviews();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer    = document.querySelector('.nav-links-mobile');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('mobile-open');
    toggleBtn.classList.toggle('open', isOpen);
  });

  // Close drawer on any link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('mobile-open');
      toggleBtn.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progress.style.width = `${scrolled}%`;
  });
}

/* --------------------------------------------------------------------------
   4. Active Navigation Link Highlighting
   -------------------------------------------------------------------------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Skill Filter Tabs
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Interactive Project Modals (.NET Focus)
   -------------------------------------------------------------------------- */
const projectData = {
  'project-1': {
    title: 'Sport Academy Management System',
    subtitle: 'Full-Stack Centralized Management Platform',
    problem: 'Sports academies often struggle with fragmented management across multiple branches, coach schedules, trainee subscriptions, attendance, and manual payment tracking.',
    solution: 'Designed and engineered a robust full-stack solution utilizing ASP.NET Core Web API and Entity Framework Core, providing a unified REST API layer connected to SQL Server. Streamlined branch administration and payment workflows into a single high-performance platform.',
    architecture: [
      'Clean Architecture (Domain, Application, Infrastructure, API layers)',
      'Entity Framework Core with Code-First approach & Migration pipelines',
      'JWT Authentication & Role-Based Access Control (Admin, Coach, Trainee)',
      'SQL Server Relational Schema with optimized indexing for multi-tenant branches',
      'RESTful endpoints handling subscription renewal triggers & automated billing logs'
    ],
    tech: ['.NET 8', 'ASP.NET Core API', 'Entity Framework Core', 'SQL Server', 'REST API', 'C#', 'Swagger/OpenAPI']
  },
  'project-2': {
    title: 'Elderly Care Management System',
    subtitle: 'Desktop Application for Operational Workflow',
    problem: 'Elderly care facilities face complex daily operational record-keeping, resident medical data tracking, and staff log coordination requiring fast offline desktop access.',
    solution: 'Engineered a highly structured C# Windows Forms desktop application integrated with SQL Server. Provides intuitive record navigation, multi-field searching, and reliable data synchronization.',
    architecture: [
      'C# Object-Oriented Architecture with Repository Pattern data access',
      'SQL Server Database with stored procedures and ACID transactions for critical health records',
      'Optimized WinForms UI designed for zero-latency data entry and rapid search lookup',
      'Role-restricted operations to ensure patient data confidentiality and audit compliance',
      'Automated daily backup utility for database preservation'
    ],
    tech: ['C#', 'Windows Forms', 'SQL Server', 'ADO.NET / EF', 'Database Design']
  }
};

function initProjectModals() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const closeBtn = document.querySelector('.modal-close');
  const modalButtons = document.querySelectorAll('[data-open-modal]');

  if (!modalBackdrop) return;

  modalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-subtitle').textContent = data.subtitle;
        document.getElementById('modal-problem').textContent = data.problem;
        document.getElementById('modal-solution').textContent = data.solution;

        // Render Architecture Items
        const archList = document.getElementById('modal-architecture');
        archList.innerHTML = data.architecture.map(item => `
          <li style="display: flex; gap: 0.75rem; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.95rem;">
            <svg style="width: 18px; height: 18px; color: var(--accent-cyan); flex-shrink: 0; margin-top: 2px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>${item}</span>
          </li>
        `).join('');

        // Render Tech Badges
        const techBox = document.getElementById('modal-tech');
        techBox.innerHTML = data.tech.map(t => `<span class="project-tech-badge">${t}</span>`).join('');

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Functionality
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--accent-cyan)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Simulation & Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields before sending.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      showToast('Message sent successfully! I will get back to you soon.');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   9. Global Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  const iconSvg = type === 'success' 
    ? `<svg style="width: 20px; height: 20px; color: var(--accent-cyan);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    : `<svg style="width: 20px; height: 20px; color: var(--accent-amber);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. Certificate Previews via PDF.js
   -------------------------------------------------------------------------- */
function initCertificatePreviews() {
  if (typeof pdfjsLib === 'undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  function renderPdf(pdfPath, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const dpr = window.devicePixelRatio || 1;
        const baseViewport = page.getViewport({ scale: 1.0 });
        const containerWidth = canvas.parentElement.clientWidth || 500;
        const scale = (containerWidth / baseViewport.width) * (dpr > 1 ? 1.5 : 1.2);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        const ctx = canvas.getContext('2d');
        page.render({
          canvasContext: ctx,
          viewport: viewport
        });
      });
    }).catch(err => {
      console.warn('Certificate render notice:', err);
    });
  }

  // Initial render
  renderPdf('assets/cert-aws.pdf', 'cert-canvas-aws');
  renderPdf('assets/cert-creativa.pdf', 'cert-canvas-creativa');

  // Re-render on window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderPdf('assets/cert-aws.pdf', 'cert-canvas-aws');
      renderPdf('assets/cert-creativa.pdf', 'cert-canvas-creativa');
    }, 250);
  });
}

