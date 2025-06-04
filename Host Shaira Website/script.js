// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar a');


    // Check if required elements exist before adding event listeners
    if (menuIcon && navbar) {
        // Mobile menu toggle
        menuIcon.addEventListener('click', () => {
            const isActive = navbar.classList.toggle('active');

            // Prevent body scroll when mobile menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar) {
                    navbar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');

        if (sections.length === 0 || navLinks.length === 0) return;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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

    // Header background change on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 232, 191, 0.95)';
            } else {
                header.style.background = 'var(--main-color)';
            }
        }
    });

    // Achievement cards hover effect
    document.querySelectorAll('.dynamic-intro-feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Read More button functionality
    const readMoreBtn = document.querySelector('.read-more-btn');
        
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const description = document.querySelector('.text-blk.description');
                if (description) {
                    if (readMoreBtn.textContent === 'Read More') {
                        description.innerHTML = `
                            My journey in the events industry began when I was in college and started in that field. I quickly discovered that I had a talent for connecting with people and creating a fun and engaging atmosphere. After pursuing marketing industry, I decided to pursue a career in event planning and hosting, and I have never looked back.
                            <br><br>
                            Over the years, I have honed my skills in public speaking, event coordination, and audience engagement. I believe that every event is unique and deserves a personalized approach. Whether it's a corporate seminar, a wedding celebration, or a product launch, I work closely with my clients to understand their vision and bring it to life.
                            <br><br>
                            My passion for creating memorable experiences drives me to continuously improve and adapt to new trends in the industry. I take pride in my ability to handle unexpected situations with grace and ensure that every event runs smoothly from start to finish.
                        `;
                        readMoreBtn.textContent = 'Read Less';
                    } else {
                        description.textContent = 'My journey in the events industry began when I was in college and started in that field. I quickly discovered that I had a talent for connecting with people and creating a fun and engaging atmosphere. After pursuing marketing industry, I decided to pursue a career in event planning and hosting, and I have never looked back.';
                        readMoreBtn.textContent = 'Read More';
                    }
                }
            });
        }

    // Feedback cards functionality
    const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.2s';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', function() {
            // Observe all testimonial containers
            const containers = document.querySelectorAll('.testimonial-container');
            containers.forEach((container, index) => {
                container.style.animationDelay = `${index * 0.2}s`;
                observer.observe(container);
            });

            // Add dynamic hover effects
            containers.forEach(container => {
                container.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                });
                
                container.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Make iframes responsive
            function makeIframesResponsive() {
                const iframes = document.querySelectorAll('.fb-embed-wrapper iframe');
                iframes.forEach(iframe => {
                    const container = iframe.closest('.fb-embed-wrapper');
                    if (container) {
                        const containerWidth = container.offsetWidth;
                        if (containerWidth < 500) {
                            iframe.style.width = '100%';
                            iframe.style.maxWidth = containerWidth + 'px';
                        }
                    }
                });
            }

            // Call on load and resize
            makeIframesResponsive();
            window.addEventListener('resize', makeIframesResponsive);
        });
});