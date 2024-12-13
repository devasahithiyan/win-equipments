// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 300,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e){
            if (this.hash !== "" && this.pathname === window.location.pathname) {
                e.preventDefault();
                const targetId = this.hash;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }

                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

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

    window.addEventListener('scroll', debounce(function(){
        let scrollPos = window.scrollY;
        navLinks.forEach(link => {
            let href = link.getAttribute("href");
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

    window.dispatchEvent(new Event('scroll'));

    if (typeof jQuery !== 'undefined') {
        $(document).ready(function(){
            // Testimonials Carousel (if applicable)
            $('.testimonials-carousel').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false,
                fade: true,
                cssEase: 'linear'
            });

            // Product Carousel (if applicable)
            if ($('.product-page .product-carousel').length) {
                $('.product-page .product-carousel').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: true,
                    prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                    nextArrow: '<button type="button" class="slick-next">Next</button>',
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });
            }

            // Initialize Slick Carousel for Our Clients
            $('.clients-carousel').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
        });
    } else {
        console.error("jQuery is not loaded. Slick Carousel requires jQuery.");
    }

    const productModel = document.getElementById('productModel');
    const modelLoader = document.getElementById('modelLoader');

    if (productModel && modelLoader) {
        modelLoader.style.display = 'block';
        productModel.addEventListener('load', () => {
            modelLoader.style.display = 'none';
        });

        productModel.addEventListener('error', () => {
            modelLoader.innerHTML = '<p>Failed to load 3D Model. Please try again later.</p>';
        });
    }

    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
