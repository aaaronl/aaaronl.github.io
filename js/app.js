/**
 * Aaron Lawrence Portfolio - Modern Vanilla JavaScript
 * ES6+ with no dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
	initNavigation();
	initSmoothScroll();
	initPortfolioFilters();
	initLightbox();
	initScrollAnimations();
	initNavbarScroll();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.querySelector('.nav-menu');

	if (!navToggle || !navMenu) return;

	navToggle.addEventListener('click', () => {
		const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', !isExpanded);
		navMenu.classList.toggle('open');
	});

	// Close menu when clicking a link
	const navLinks = navMenu.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			navToggle.setAttribute('aria-expanded', 'false');
			navMenu.classList.remove('open');
		});
	});

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
			navToggle.setAttribute('aria-expanded', 'false');
			navMenu.classList.remove('open');
		}
	});
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
	const links = document.querySelectorAll('a[href^="#"]');

	links.forEach(link => {
		link.addEventListener('click', (e) => {
			const targetId = link.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (!targetElement) return;

			e.preventDefault();

			const navHeight = 70;
			const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		});
	});
}

/**
 * Portfolio Filter Functionality
 */
function initPortfolioFilters() {
	const filterButtons = document.querySelectorAll('.filter-btn');
	const portfolioItems = document.querySelectorAll('.portfolio-item');

	if (!filterButtons.length || !portfolioItems.length) return;

	filterButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Update active button
			filterButtons.forEach(btn => btn.classList.remove('active'));
			button.classList.add('active');

			// Filter items
			const filter = button.dataset.filter;

			portfolioItems.forEach(item => {
				if (filter === 'all' || item.dataset.category === filter) {
					item.classList.remove('hidden');
					item.style.animation = 'fadeIn 0.4s ease forwards';
				} else {
					item.classList.add('hidden');
				}
			});
		});
	});

	// Add fade-in animation
	const style = document.createElement('style');
	style.textContent = `
		@keyframes fadeIn {
			from { opacity: 0; transform: scale(0.95); }
			to { opacity: 1; transform: scale(1); }
		}
	`;
	document.head.appendChild(style);
}

/**
 * Lightbox for Portfolio Images
 */
function initLightbox() {
	const lightbox = document.getElementById('lightbox');
	const lightboxImage = lightbox?.querySelector('.lightbox-image');
	const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
	const lightboxClose = lightbox?.querySelector('.lightbox-close');
	const portfolioItems = document.querySelectorAll('.portfolio-item');

	if (!lightbox || !portfolioItems.length) return;

	// Open lightbox
	portfolioItems.forEach(item => {
		item.addEventListener('click', () => {
			const img = item.querySelector('img');
			const title = item.querySelector('h3')?.textContent || '';

			if (img) {
				lightboxImage.src = img.src;
				lightboxImage.alt = img.alt;
				lightboxCaption.textContent = title;
				lightbox.classList.add('active');
				lightbox.setAttribute('aria-hidden', 'false');
				document.body.style.overflow = 'hidden';
			}
		});
	});

	// Close lightbox
	const closeLightbox = () => {
		lightbox.classList.remove('active');
		lightbox.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	};

	lightboxClose?.addEventListener('click', closeLightbox);

	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			closeLightbox();
		}
	});

	// Close on escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && lightbox.classList.contains('active')) {
			closeLightbox();
		}
	});
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
	const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .about-content, .portfolio-grid, .timeline-item, .contact-grid');

	if (!animatedElements.length) return;

	// Add animation class
	animatedElements.forEach(el => {
		el.classList.add('animate-on-scroll');
	});

	const observerOptions = {
		root: null,
		rootMargin: '0px 0px -50px 0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	animatedElements.forEach(el => observer.observe(el));
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
	const nav = document.querySelector('.nav');
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('section[id]');

	if (!nav) return;

	let ticking = false;

	const updateNav = () => {
		const scrollY = window.pageYOffset;

		// Add scrolled class
		if (scrollY > 50) {
			nav.classList.add('scrolled');
		} else {
			nav.classList.remove('scrolled');
		}

		// Update active link based on scroll position
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 100;
			const sectionBottom = sectionTop + section.offsetHeight;

			if (scrollY >= sectionTop && scrollY < sectionBottom) {
				const currentId = section.getAttribute('id');
				navLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('href') === `#${currentId}`) {
						link.classList.add('active');
					}
				});
			}
		});

		ticking = false;
	};

	window.addEventListener('scroll', () => {
		if (!ticking) {
			window.requestAnimationFrame(updateNav);
			ticking = true;
		}
	}, { passive: true });

	// Initial check
	updateNav();
}
