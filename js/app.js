/**
 * Modern Vanilla JavaScript for Aaron Lawrence Portfolio
 * Replaces jQuery and legacy plugins with native ES6+ APIs
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	initPreloader();
	initSmoothScroll();
	initAnimatedHeader();
	initScrollAnimations();
	initMobileNavClose();
});

/**
 * Preloader - Fade out the loading screen
 */
function initPreloader() {
	const loader = document.getElementById('loader');
	const loaderInner = document.getElementById('loaderInner');

	if (loaderInner) {
		loaderInner.style.transition = 'opacity 0.3s ease';
		loaderInner.style.opacity = '0';
	}

	if (loader) {
		setTimeout(() => {
			loader.style.transition = 'opacity 0.5s ease';
			loader.style.opacity = '0';
			setTimeout(() => {
				loader.style.display = 'none';
			}, 500);
		}, 800);
	}
}

/**
 * Smooth Scroll - Native smooth scrolling for navigation links
 */
function initSmoothScroll() {
	const scrollLinks = document.querySelectorAll('a.page-scroll');

	scrollLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const navbarHeight = 70;
				const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
}

/**
 * Animated Header - Shrink navbar on scroll
 */
function initAnimatedHeader() {
	const navbar = document.querySelector('.navbar-default');
	const changeHeaderOn = 200;
	let ticking = false;

	if (!navbar) return;

	const updateHeader = () => {
		const scrollY = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollY >= changeHeaderOn) {
			navbar.classList.add('navbar-shrink');
		} else {
			navbar.classList.remove('navbar-shrink');
		}
		ticking = false;
	};

	window.addEventListener('scroll', () => {
		if (!ticking) {
			window.requestAnimationFrame(updateHeader);
			ticking = true;
		}
	}, { passive: true });

	// Initial check
	updateHeader();
}

/**
 * Scroll Animations - Using Intersection Observer instead of WOW.js
 */
function initScrollAnimations() {
	const animatedElements = document.querySelectorAll('.wow');

	if (!animatedElements.length) return;

	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const animationObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const element = entry.target;

				// Get animation classes
				const animationClasses = [];
				element.classList.forEach(cls => {
					if (cls.startsWith('fade') || cls.startsWith('zoom') ||
					    cls.startsWith('bounce') || cls.startsWith('slide')) {
						animationClasses.push(cls);
					}
				});

				// Add animated class to trigger CSS animation
				element.classList.add('animated');
				element.style.visibility = 'visible';

				// Unobserve after animation is triggered
				animationObserver.unobserve(element);
			}
		});
	}, observerOptions);

	// Set initial state and observe
	animatedElements.forEach(element => {
		element.style.visibility = 'hidden';
		animationObserver.observe(element);
	});
}

/**
 * Mobile Navigation - Close menu when a link is clicked
 */
function initMobileNavClose() {
	const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
	const navbarCollapse = document.getElementById('mainNavbar');

	if (!navbarCollapse) return;

	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			// Check if navbar is expanded (mobile view)
			if (navbarCollapse.classList.contains('show')) {
				// Use Bootstrap 5's collapse API
				const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
				if (bsCollapse) {
					bsCollapse.hide();
				}
			}
		});
	});
}
