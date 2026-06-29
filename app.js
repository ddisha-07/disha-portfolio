// Wait for DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {

  // 1. Data Definitions (Projects, Skills, Socials)
  const projects = [
    {
      id: "sketchflow",
      name: "SketchFlow",
      type: "Web App",
      brief: "Real-time collaborative whiteboard with AI shape recognition and smart connectors for distributed teams.",
      unsplash: "photo-1611532736597-de2d4265fba3",
      tags: ["React", "WebSocket", "Canvas API"],
      link: "https://github.com/ddisha-07/SketchFlow",
      isShowcase: true
    },
    {
      id: "neuralnote",
      name: "NeuralNote",
      type: "AI Tool",
      brief: "Smart note-taking that auto-summarizes, tags, and links thoughts into an interconnected knowledge graph.",
      unsplash: "photo-1677442135703-1787eea5ce01",
      tags: ["Python", "OpenAI", "Next.js"],
      link: "https://github.com/ddisha-07/NeuralNote",
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

  const techSkills = ["Python", "Node.js", "TailwindCSS", "PostgreSQL", "Next.js", "C++", "Figma", "Git", "Linux", "Vite", "Java", "HTML"];
  const softSkills = ["UI/UX Design", "Problem Solving", "Communication", "Teamwork", "Time Management", "Creative Thinking", "Public Speaking", "Leadership", "Adaptability", "Research", "Wireframing", "Design Systems", "Agile", "Mentoring"];

  const socialLinks = [
    { name: "GitHub", icon: "fab fa-github", handle: "@disha_dev", url: "https://github.com/ddisha-07", desc: "Code & open source projects" },
    { name: "LinkedIn", icon: "fab fa-linkedin-in", handle: "Disha Shree", url: "https://linkedin.com", desc: "Professional network" },
    { name: "Twitter", icon: "fab fa-x-twitter", handle: "@dishabuilds", url: "https://twitter.com", desc: "Thoughts, threads & takes" },
    { name: "Dribbble", icon: "fab fa-dribbble", handle: "dishadesigns", url: "https://dribbble.com", desc: "Design shots & concepts" },
    { name: "Instagram", icon: "fab fa-instagram", handle: "@disha.creates", url: "https://instagram.com", desc: "Design & life" },
    { name: "Email", icon: "fas fa-envelope", handle: "disha@university.edu", url: "mailto:disha@university.edu", desc: "Direct line — always open" }
  ];

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
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      if (isLight) {
        localStorage.setItem('disha_theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
      } else {
        localStorage.setItem('disha_theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
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

  // 4. Inject Social Cards Grid
  const socialsGrid = document.getElementById('socials-grid');
  if (socialsGrid) {
    socialsGrid.innerHTML = socialLinks.map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-card">
        <div class="social-icon-frame">
          <i class="${link.icon} fa-lg"></i>
        </div>
        <p class="social-name">${link.name}</p>
        <p class="social-handle">${link.handle}</p>
        <p class="social-desc-txt">${link.desc}</p>
        <div class="social-visit-link">
          <span>Visit</span>
          <i class="fas fa-arrow-right fa-xs"></i>
        </div>
      </a>
    `).join('');
  }

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
