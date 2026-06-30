// Wait for DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {

  // 1. Data Definitions (Projects, Skills, Socials)
  const projects = [
    {
      id: "xpenseo",
      name: "Xpenseo",
      type: "Expense Tracker",
      brief: "A smart expense tracking application with monthly analytics, category breakdowns, and budget limits.",
      unsplash: "photo-1554224155-8d04cb21cd6c",
      tags: ["JavaScript", "HTML", "CSS"],
      link: "https://xpenseo.vercel.app/",
      isShowcase: true
    },
    {
      id: "kai",
      name: "Kai",
      type: "AI ChatBot",
      brief: "An AI-powered multilingual Learning & Development platform that captures organizational knowledge from experts and retired employees, making it accessible to workers, trainees, and engineers through Kai, an intelligent conversational assistant.",
      unsplash: "photo-1531747118685-ca8fa6e08806",
      tags: ["JavaScript", "HTML", "CSS"],
      link: "https://mentora-kai.vercel.app/",
      isShowcase: true
    },
    {
      id: "spendly",
      name: "Spendly",
      type: "FinTech App",
      brief: "Personal finance dashboard tracking real-time expenses, spending analytics, and custom saving goals.",
      unsplash: "photo-1551288049-bebda4e38f71",
      tags: ["D3.js", "Vite", "JSON API"],
      link: "ecommerce.html",
      isShowcase: false
    },
    {
      id: "dewyglow",
      name: "DewyGlow",
      type: "Skincare E-Com",
      brief: "Premium skincare e-commerce platform with smart skin type routine builders and checkout integration.",
      unsplash: "photo-1466611653911-95081537e5b7",
      tags: ["Figma", "HTML5", "CSS Grid"],
      link: "music.html",
      isShowcase: false
    },
    {
      id: "physics-wave",
      name: "Kinetic Wave Engine",
      type: "Physics Sandbox",
      brief: "HTML5 Canvas wave motion physics sandbox simulator with interactive controls and color mappings.",
      unsplash: "photo-1523240795612-9a054b0db644",
      tags: ["Canvas API", "Math", "Physics"],
      link: "physics.html",
      isShowcase: false
    },
    {
      id: "devspace",
      name: "DevSpace",
      type: "Browser Extension",
      brief: "Chrome productivity tool for developers: smart tab grouping, snippet vault, instant MDN search.",
      unsplash: "photo-1504639725590-34d0984388bd",
      tags: ["JavaScript", "Chrome APIs", "CSS"],
      link: "https://github.com/ddisha-07/DevSpace",
      isShowcase: true
    }
  ];

  const techSkills = ["Python", "Java", "HTML", "C", "Canva", "Figma", "AI"];
  const softSkills = ["UI/UX Design", "Problem Solving", "Communication", "Teamwork", "Time Management", "Creative Thinking", "Public Speaking", "Leadership", "Adaptability", "Research", "Wireframing", "Design Systems", "Agile", "Mentoring"];



  // 2. Navigation & Theme Toggle Setup
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const navMenuWrapper = document.getElementById('nav-menu-wrapper');
  
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Handle Navbar Scroll Blur Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Handle Mobile/Hamburger Menu
  if (menuToggle && navMenuWrapper) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenuWrapper.classList.toggle('active');
      if (isActive) {
        menuIcon.className = 'fas fa-xmark';
      } else {
        menuIcon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking link items
    const navLinks = navMenuWrapper.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenuWrapper.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenuWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenuWrapper.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
      }
    });
  }

  // Handle Dark / Light Theme Switching
  const savedTheme = localStorage.getItem('disha_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      if (isLight) {
        localStorage.setItem('disha_theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
      } else {
        localStorage.setItem('disha_theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
      }
    });
  }

  // 3. Inject Opposing Skills Marquees
  const marquee1 = document.getElementById('skills-marquee-1');
  const marquee2 = document.getElementById('skills-marquee-2');

  const createMarqueeContent = (items) => {
    // Repeat items three times to ensure continuous seamless scroll loops
    const repeated = [...items, ...items, ...items];
    return repeated.map(item => `<span class="marquee-tag">${item}</span>`).join('');
  };

  if (marquee1) marquee1.innerHTML = createMarqueeContent(techSkills);
  if (marquee2) marquee2.innerHTML = createMarqueeContent(softSkills);



  // 5. Projects Rendering & View Switcher (Tiles vs. List)
  const projectsContainer = document.getElementById('projects-container');
  const viewTilesBtn = document.getElementById('view-tiles-btn');
  const viewListBtn = document.getElementById('view-list-btn');

  let currentView = 'tile'; // 'tile' or 'list'

  const renderProjects = () => {
    if (!projectsContainer) return;
    
    if (currentView === 'tile') {
      projectsContainer.className = 'projects-tiles-grid';
      projectsContainer.innerHTML = projects.map(proj => `
        <div class="project-tile-card" data-id="${proj.id}">
          <img src="https://images.unsplash.com/${proj.unsplash}?w=640&h=480&fit=crop&auto=format" alt="${proj.name}" class="tile-img" loading="lazy">
          <div class="tile-gradient-overlay"></div>
          
          <!-- Static labels -->
          <div class="tile-static-info">
            <p class="tile-static-title">${proj.name}</p>
            <p class="tile-static-type">${proj.type}</p>
          </div>

          <!-- Hover Details overlay -->
          <div class="tile-hover-overlay">
            <p class="tile-hover-title">${proj.name}</p>
            <p class="tile-hover-type">${proj.type}</p>
            <p class="tile-hover-brief">${proj.brief}</p>
            <div class="tile-hover-tags">
              ${proj.tags.map(t => `<span class="tile-hover-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    } else {
      projectsContainer.className = 'projects-list-layout';
      projectsContainer.innerHTML = projects.map(proj => `
        <div class="project-list-row" data-id="${proj.id}">
          <img src="https://images.unsplash.com/${proj.unsplash}?w=160&h=120&fit=crop&auto=format" alt="${proj.name}" class="list-thumbnail" loading="lazy">
          
          <div class="list-info-block">
            <div class="list-title-row">
              <span class="list-title">${proj.name}</span>
              <span class="list-type-badge">${proj.type}</span>
            </div>
            <p class="list-brief">${proj.brief}</p>
            <div class="list-tags">
              ${proj.tags.map(t => `<span class="list-tag">${t}</span>`).join('')}
            </div>
          </div>

          <div class="list-arrow-icon">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      `).join('');
    }

    // Attach click events on newly rendered card selectors
    const cards = projectsContainer.querySelectorAll('.project-tile-card, .project-list-row');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const proj = projects.find(p => p.id === id);
        if (proj) {
          if (proj.isShowcase) {
            openProjectModal(proj);
          } else {
            // Direct navigate for case studies
            window.location.href = proj.link;
          }
        }
      });
    });
  };

  // Switch to tiles view
  if (viewTilesBtn) {
    viewTilesBtn.addEventListener('click', () => {
      if (currentView === 'tile') return;
      currentView = 'tile';
      viewTilesBtn.classList.add('active');
      if (viewListBtn) viewListBtn.classList.remove('active');
      renderProjects();
    });
  }

  // Switch to list view
  if (viewListBtn) {
    viewListBtn.addEventListener('click', () => {
      if (currentView === 'list') return;
      currentView = 'list';
      viewListBtn.classList.add('active');
      if (viewTilesBtn) viewTilesBtn.classList.remove('active');
      renderProjects();
    });
  }

  // Initial projects rendering
  renderProjects();

  // 6. Glassmorphic Modal Manager for Showcase Projects
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  const modalType = document.getElementById('modal-project-type');
  const modalName = document.getElementById('modal-project-name');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTags = document.getElementById('modal-project-tags');
  const modalLink = document.getElementById('modal-project-link');

  const openProjectModal = (proj) => {
    if (!modalOverlay) return;
    
    modalType.textContent = proj.type;
    modalName.textContent = proj.name;
    modalDesc.textContent = proj.brief;
    modalTags.innerHTML = proj.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
    modalLink.href = proj.link;

    // Dynamically update link text and icon based on destination
    const linkText = modalLink.querySelector('span');
    const linkIcon = modalLink.querySelector('i');
    if (linkText) {
      if (proj.link.includes('github.com')) {
        linkText.textContent = 'Visit Github';
        if (linkIcon) {
          linkIcon.className = 'fab fa-github';
        }
      } else {
        linkText.textContent = 'Visit Site';
        if (linkIcon) {
          linkIcon.className = 'fas fa-arrow-up-right-from-square';
        }
      }
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent screen scroll behind active modal
  };

  const closeProjectModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 7. Navigation Actions & Scroll Utilities
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const logoTop = document.getElementById('logo-top');
  
  const heroCtaBtn = document.getElementById('hero-cta-btn');
  const heroArrowBtn = document.getElementById('hero-arrow-btn');

  const scrollToSection = (selector) => {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (logoTop) {
    logoTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => scrollToSection('#projects'));
  }
  if (heroArrowBtn) {
    heroArrowBtn.addEventListener('click', () => scrollToSection('#projects'));
  }

});
