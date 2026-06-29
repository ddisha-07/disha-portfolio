// Wait for DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // Global Event Target Selectors for Custom Cursor Interactions
    // -------------------------------------------------------------
    const hoverSelector = 'a, button, .filter-btn, .skill-tag, .theme-btn, .submit-btn, .project-link, .hero-scroll-indicator a, .project-flip-card, .hero-snapshot-container, .social-glass-card, .skill-tile';

    // -------------------------------------------------------------
    // 1. Additive Light Custom Cursor System (The "Desire Agency" Cursor)
    // -------------------------------------------------------------
    const cursorRing = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let glowX = mouseX;
    let glowY = mouseY;
    
    let ringX = mouseX;
    let ringY = mouseY;
    
    let dotX = mouseX;
    let dotY = mouseY;
    
    let isMoving = false;
    let isTouchDevice = false;

    // Detect touch inputs to prevent rendering custom cursor on mobile
    window.addEventListener('touchstart', function detectTouch() {
        isTouchDevice = true;
        window.removeEventListener('touchstart', detectTouch);
    }, { passive: true });

    if (cursorRing && cursorDot && !isTouchDevice) {
        // Add enabled class to body
        document.body.classList.add('custom-cursor-enabled');

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isMoving) {
                isMoving = true;
                cursorGlow.style.opacity = '1';
                cursorRing.style.opacity = '1';
                cursorDot.style.opacity = '1';
            }
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
            cursorRing.style.opacity = '0';
            cursorDot.style.opacity = '0';
            isMoving = false;
        });

        document.addEventListener('mouseenter', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.opacity = '1';
            cursorRing.style.opacity = '1';
            cursorDot.style.opacity = '1';
            isMoving = true;
        });

        // Delegate hover interactive styles (Glowing sunset ring)
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest(hoverSelector);
            if (target) {
                cursorRing.classList.add('hover-state');
                cursorDot.style.opacity = '0'; // Hide dot inside the ring for cleaner contrast
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest(hoverSelector);
            if (target) {
                cursorRing.classList.remove('hover-state');
                cursorDot.style.opacity = '1';
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Interactive Topographic Bending Canvas Background
    // -------------------------------------------------------------
    const heroCanvas = document.getElementById('hero-canvas');
    let waves = [];
    const waveCount = 18;

    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let width = (heroCanvas.width = heroCanvas.offsetWidth);
        let height = (heroCanvas.height = heroCanvas.offsetHeight);

        // Define topographic wave contour coordinates
        class TopoWave {
            constructor(yOffset, spacing) {
                this.points = [];
                this.yOffset = yOffset;
                this.spacing = spacing;
                this.pointCount = 20; // Coordinates per path
                this.seed = Math.random() * 100;
                
                // Initialize control points
                for (let i = 0; i <= this.pointCount; i++) {
                    this.points.push({
                        x: (width / this.pointCount) * i,
                        y: this.yOffset,
                        baseY: this.yOffset,
                        angle: Math.random() * Math.PI * 2
                    });
                }
            }

            update(targetX, targetY, time) {
                for (let i = 0; i < this.points.length; i++) {
                    const pt = this.points[i];
                    
                    // 1. Slow cosmic wave floating motion (Math.sin contour lines)
                    const waveVal = Math.sin(time * 0.0015 + pt.x * 0.004 + this.seed) * 16;
                    pt.y = pt.baseY + waveVal;

                    // 2. Magnetic displacement from custom cursor
                    // Vector calculation from cursor coordinates
                    const dx = pt.x - targetX;
                    const dy = pt.y - targetY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const warpThreshold = 170; // Proximity ripple limit

                    if (distance < warpThreshold) {
                        const force = (warpThreshold - distance) / warpThreshold;
                        
                        // Push points away from the cursor coordinates
                        pt.x += (dx / distance) * force * 35;
                        pt.y += (dy / distance) * force * 35;
                    } else {
                        // Smoothly ease control points back to their horizontal grid
                        const targetXGrid = (width / this.pointCount) * i;
                        pt.x += (targetXGrid - pt.x) * 0.08;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.points[0].x, this.points[0].y);

                // Draw smooth cubic bezier lines across points
                for (let i = 0; i < this.points.length - 1; i++) {
                    const xc = (this.points[i].x + this.points[i + 1].x) / 2;
                    const yc = (this.points[i].y + this.points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
                }

                ctx.quadraticCurveTo(
                    this.points[this.points.length - 1].x,
                    this.points[this.points.length - 1].y,
                    this.points[this.points.length - 1].x,
                    this.points[this.points.length - 1].y
                );

                ctx.strokeStyle = 'rgba(0, 255, 224, 0.055)';
                ctx.lineWidth = 1;
                
                ctx.stroke();
            }
        }

        // Initialize waves evenly distributed vertically
        function initWaves() {
            waves = [];
            const spacing = height / (waveCount + 1);
            for (let i = 1; i <= waveCount; i++) {
                waves.push(new TopoWave(spacing * i, spacing));
            }
        }
        initWaves();

        // Handle resize
        window.addEventListener('resize', () => {
            width = (heroCanvas.width = heroCanvas.offsetWidth);
            height = (heroCanvas.height = heroCanvas.offsetHeight);
            initWaves();
        });
    }

    // -------------------------------------------------------------
    // 3. Proximity Magnetic Snapping Navigation System
    // -------------------------------------------------------------
    const magneticLinks = document.querySelectorAll('.nav-magnetic-item');

    function updateMagneticSnapping() {
        magneticLinks.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;

            const dx = mouseX - elX;
            const dy = mouseY - elY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const magnetLimit = 75; // Proximity boundary

            if (distance < magnetLimit) {
                // Shift text directly towards the cursor (spring-pull snap)
                const snapX = dx * 0.38;
                const snapY = dy * 0.38;
                
                el.style.transform = `translate(${snapX}px, ${snapY}px) scale(1.05)`;
                el.style.color = 'var(--text-primary)';
                el.style.textShadow = '0 0 10px rgba(0, 255, 224, 0.4)';
                el.style.transition = 'transform 0.08s ease';
            } else {
                // Reset to default flat position
                el.style.transform = 'translate(0px, 0px) scale(1)';
                el.style.color = '';
                el.style.textShadow = '';
                el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });
    }

    // -------------------------------------------------------------
    // Combined Main Core Graphics Loop (60fps Physics Integration)
    // -------------------------------------------------------------
    let animationTime = 0;
    
    function globalAnimationLoop() {
        animationTime += 16; // Increment elapsed frame milliseconds

        // 1. Smooth custom cursor lerp calculations
        if (cursorRing && cursorDot && isMoving && !isTouchDevice) {
            // Ambient follow glow (slow, lazy float)
            glowX += (mouseX - glowX) * 0.055;
            glowY += (mouseY - glowY) * 0.055;
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            // Custom cursor outer ring (slightly faster delay)
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            // Custom cursor center dot (tight tracking)
            dotX += (mouseX - dotX) * 0.45;
            dotY += (mouseY - dotY) * 0.45;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }

        // 2. Update and render topographic background waves
        if (heroCanvas) {
            const ctx = heroCanvas.getContext('2d');
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            
            for (let i = 0; i < waves.length; i++) {
                waves[i].update(mouseX, mouseY, animationTime);
                waves[i].draw();
            }
        }

        // 3. Update navigation snapping coordinates
        updateMagneticSnapping();

        requestAnimationFrame(globalAnimationLoop);
    }
    
    // Launch the combined master graphics engine
    globalAnimationLoop();

    // -------------------------------------------------------------
    // 4. Hero Typographic Mask Reveal Trigger
    // -------------------------------------------------------------
    // Delay slightly to allow resources to settle before firing upward masks
    setTimeout(() => {
        document.body.classList.add('hero-active');
    }, 150);

    // -------------------------------------------------------------
    // 5. Left Column Snapshot Card 3D Tilt Physics
    // -------------------------------------------------------------
    const snapshotCard = document.querySelector('.hero-snapshot-container');
    
    if (snapshotCard) {
        const glow = snapshotCard.querySelector('.snapshot-card-glow');

        snapshotCard.addEventListener('mousemove', (e) => {
            const rect = snapshotCard.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt physics angle (+/- 6 degrees limit)
            const rotateX = -((e.clientY - rect.top - centerY) / centerY) * 6;
            const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 6;

            snapshotCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.035)`;
            snapshotCard.style.transition = 'transform 0.1s ease';
        });

        snapshotCard.addEventListener('mouseleave', () => {
            snapshotCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            snapshotCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }

    // -------------------------------------------------------------
    // 6. Global Viewport Reveal Scroll Engine
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // -------------------------------------------------------------
    // 7. Sticky Bio Block ScrollSpy Scaffolding
    // -------------------------------------------------------------
    const bioBlocks = document.querySelectorAll('.bio-reveal-block');

    const bioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bioBlocks.forEach(b => b.classList.remove('active'));
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.45,
        rootMargin: '-10% 0px -30% 0px'
    });

    bioBlocks.forEach(block => {
        bioObserver.observe(block);
    });

    // -------------------------------------------------------------
    // 8. 3D Flip Card Glow Tracking & Mobile Touch Support
    // -------------------------------------------------------------
    const flipCards = document.querySelectorAll('.project-flip-card');

    flipCards.forEach(card => {
        const glows = card.querySelectorAll('.bento-card-glow');

        // Dynamic mouse coordinate tracking for dual face neon halos
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            glows.forEach(glow => {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            });
        });

        // Touch-screen tap support to flip card faces without breaking link navigation
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link-btn')) {
                return; // Allow direct click through to case study pages
            }
            
            if (window.matchMedia('(max-width: 1024px)').matches) {
                e.preventDefault();
                
                // Close other cards first for a clean accordion visual feel
                flipCards.forEach(c => {
                    if (c !== card) c.classList.remove('flipped');
                });
                
                card.classList.toggle('flipped');
            }
        });
    });

    // -------------------------------------------------------------
    // 9. Contact Form Explosion Canvas & Transmit Burst Physics
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const burstCanvas = document.getElementById('burst-canvas');
    let burstCtx = null;
    let burstParticles = [];

    if (burstCanvas) {
        burstCtx = burstCanvas.getContext('2d');
        burstCanvas.width = window.innerWidth;
        burstCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            burstCanvas.width = window.innerWidth;
            burstCanvas.height = window.innerHeight;
        });
    }

    class BurstParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 3;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed - 2;
            this.radius = Math.random() * 3 + 1;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.hue = Math.random() < 0.7 ? 40 : 180; // Gold sunset vs Cyan sparks
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= this.decay;
        }

        draw() {
            burstCtx.beginPath();
            burstCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            burstCtx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.alpha})`;
            burstCtx.fill();
        }
    }

    function animateBursts() {
        if (burstParticles.length === 0) {
            burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
            return;
        }

        burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
        
        for (let i = burstParticles.length - 1; i >= 0; i--) {
            burstParticles[i].update();
            burstParticles[i].draw();
            
            if (burstParticles[i].alpha <= 0) {
                burstParticles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateBursts);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name').value;
            const emailInput = document.getElementById('email').value;
            const messageInput = document.getElementById('message').value;
            const submitBtn = document.getElementById('submit-btn');

            if (!submitBtn) return;

            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Transmitting...</span><i class="fas fa-spinner fa-spin"></i>`;

            // Transmit data via FormSubmit.co AJAX Endpoint
            fetch("https://formsubmit.co/ajax/ddishashree2006@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: nameInput,
                    email: emailInput,
                    message: messageInput,
                    _subject: `New Message from Disha Portfolio! (${nameInput})`,
                    _captcha: "false" // Instantaneous submission without reCAPTCHA redirection page
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Transmission error");
            })
            .then(data => {
                // Success: Fire the particle burst explosion
                const btnRect = submitBtn.getBoundingClientRect();
                const spawnX = btnRect.left + btnRect.width / 2;
                const spawnY = btnRect.top + btnRect.height / 2;

                for (let i = 0; i < 90; i++) {
                    burstParticles.push(new BurstParticle(spawnX, spawnY));
                }
                
                animateBursts();

                submitBtn.classList.add('success-burst');
                submitBtn.innerHTML = `<span>Transmitted Successfully!</span><i class="fas fa-check"></i>`;

                setTimeout(() => {
                    showToast(`<i class="fas fa-check-circle"></i> Connection request transmitted, ${nameInput}!`, 5000);
                    
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success-burst');
                    submitBtn.innerHTML = originalHTML;
                    
                    contactForm.reset();
                }, 1600);
            })
            .catch(error => {
                console.error("FormSubmit Transmission Error:", error);
                showToast(`<i class="fas fa-exclamation-circle"></i> Transmission failed. Please try again or email me directly.`, 5000);
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            });
        });
    }

    // -------------------------------------------------------------
    // Helper: Toast Notifications System
    // -------------------------------------------------------------
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, duration = 4000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = message;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, duration);
    }

    // -------------------------------------------------------------
    // 10. Navigation active class Spy
    // -------------------------------------------------------------
    const headerSections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .side-nav-item');
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');

    function updateActiveLink() {
        let currentSectionId = '';
        
        headerSections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    function updateScrollProgress() {
        if (!progressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        } else {
            progressBar.style.width = '0%';
        }
    }

    function handleScroll() {
        updateActiveLink();
        updateScrollProgress();
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set active states correctly on page load
    handleScroll();

    // -------------------------------------------------------------
    // 11. Dark/Light Theme Manager
    // -------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
                showToast('☀️ Ambient Light Switched', 3000);
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
                showToast('🌙 Space Shadows Switched', 3000);
            }
        });
    }

    // -------------------------------------------------------------
    // 12. Mobile Touch Zoom for Navbar Logo
    // -------------------------------------------------------------
    const logoBrand = document.querySelector('.navbar .logo');
    if (logoBrand) {
        logoBrand.addEventListener('click', (e) => {
            // Toggle touch zoom on mobile touch devices
            if (window.matchMedia('(max-width: 1024px)').matches) {
                e.preventDefault();
                logoBrand.classList.toggle('touch-active');
            }
        });
        
        // Hide preview when tapping outside of logo brand
        document.addEventListener('click', (e) => {
            if (!logoBrand.contains(e.target)) {
                logoBrand.classList.remove('touch-active');
            }
        });
    }

    // -------------------------------------------------------------
    // 13. Mobile Menu Dropdown Interactivity
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && mobileNavLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNavLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileNavLinks.classList.contains('active')) {
                    icon.className = 'fas fa-xmark';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Close menu when clicking a link
        const navItems = mobileNavLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileNavLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNavLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileNavLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
});
