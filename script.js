/*----------------------------------------
1. Initialize AOS (Animate On Scroll)
----------------------------------------*/
AOS.init({
    duration: 600, // Animation duration in milliseconds
    easing: 'ease-in-out', // Animation easing
    once: true, // Whether animation should happen only once while scrolling down
    offset: 100 // Offset (in px) from the original trigger point
});

/*----------------------------------------
2. Document Ready Function
----------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    // Toggle Menu for Mobile View
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul'); // Corrected selector

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active'); // Toggle 'active' on <nav> ul
            menuToggle.classList.toggle('active'); // Optional: Add active state to toggle button
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e){
            // Check if the link is pointing to the current page with a hash
            if (this.hash !== "" && this.pathname === window.location.pathname) {
                e.preventDefault(); // Prevents default anchor behavior
                const targetId = this.hash;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Adjusted for fixed header height
                        behavior: 'smooth'
                    });
                }

                // Close the menu after clicking a link on mobile
                navUl.classList.remove('active');
                menuToggle.classList.remove('active'); // Optional
            }
        });
    });

    // Highlight Active Navigation Link on Scroll
    window.addEventListener('scroll', debounce(function(){
        let scrollPos = window.scrollY;

        navLinks.forEach(link => {
            let href = link.getAttribute("href");
            // Extract the hash if it exists
            let hash = href.includes('#') ? href.substring(href.indexOf('#')) : null;
            let refElement = hash ? document.querySelector(hash) : null;

            if (refElement) {
                if (refElement.offsetTop - 90 <= scrollPos && (refElement.offsetTop + refElement.offsetHeight) > scrollPos) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    }, 100));

    // Debounce Function to Limit the Rate at Which a Function Can Fire
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Trigger scroll event on page load to set the active link
    window.dispatchEvent(new Event('scroll'));

    /*----------------------------------------
    3. Initialize Slick Carousel (Scoped to Product Page)
    ----------------------------------------*/
    // Ensure that jQuery is loaded before this script
    if (typeof jQuery !== 'undefined') {
        $(document).ready(function(){
            $('.product-page .product-carousel').slick({
                dots: true, // Enable dots for pagination
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true, // Enable arrows for navigation
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false, // Hide arrows on smaller screens
                            dots: true
                        }
                    }
                ]
            });
        });
    } else {
        console.error("jQuery is not loaded. Slick Carousel requires jQuery.");
    }

    /*----------------------------------------
    4. Handle 3D Model Loading Indicators for Product
    ----------------------------------------*/
    const productModel = document.getElementById('productModel');
    const modelLoader = document.getElementById('modelLoader');

    if (productModel && modelLoader) {
        // Show loader initially
        modelLoader.style.display = 'block';

        // Hide loader once model is loaded
        productModel.addEventListener('load', () => {
            modelLoader.style.display = 'none';
        });

        // Handle errors during model loading
        productModel.addEventListener('error', () => {
            modelLoader.innerHTML = '<p>Failed to load 3D Model. Please try again later.</p>';
        });
    }

    /*----------------------------------------
    5. Initialize Other Plugins or Scripts
    ----------------------------------------*/
    // Add any additional initializations here
});
