/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Initialize carousels
    const carousel = document.getElementById("carouselSNB");
    const overlay = document.getElementById("carouselOverlay");
    const wrapper = document.getElementById("carousel-wrapper");

    let isZoomed = false;

    // Toggle zoom
    carousel.addEventListener("click", function (e) {
        if (!isZoomed) {
            overlay.classList.add("show");
            isZoomed = true;
        }
    });

    // Exit on overlay click (but not nav buttons)
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.classList.remove("show");
            isZoomed = false;
        }
    });

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if (window.innerWidth < 512) {
        document.getElementById('emailAddress').placeholder = 'Email';
    }

});

function changePic(filepath) {
    this.src = filepath;
};


// function toggleZoom() {
//   const wrapper = document.querySelector('.carousel-wrapper');
//   const overlay = document.getElementById('carouselOverlay');
//   wrapper.classList.toggle('zoomed');
//   overlay.classList.toggle('active');
// }

let isZoomed = false; // Flag to track if zoom is active

// Add event listener to the carousel items for zoom toggle
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', function () {
        if (isZoomed) {
            // If zoomed in, zoom out
            zoomOut();
        } else {
            // If zoomed out, zoom in
            zoomIn();
        }
    });
});

// Arrow click event to switch images
const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');

[prevButton, nextButton].forEach(button => {
    button.addEventListener('click', function (event) {
        // If zoomed, prevent zoom-in on arrow click
        if (isZoomed) {
            event.preventDefault(); // Prevent zoom from being triggered
        }
    });
});

// Function to zoom in
function zoomIn() {
    let _target = event.target;
    const rect = _target.getBoundingClientRect();
    console.log(rect.top, rect.height, rect.left, rect.width);

    let ancestor = _target.closest('[id*="Wrapper"]');

    const rCenterX = parseFloat(rect.left) + parseFloat(_target.width / 2);
    const rCenterY = /*parseFloat(rect.top) + */parseFloat(_target.height / 2);

    const wCenterX = window.innerWidth / 2;
    const wCenterY = window.innerHeight / 2;

    const translateX = wCenterX - rCenterX;
    const translateY = wCenterY - rCenterY;

    //ancestor.style.transformOrigin = 'center center';
    ancestor.style.transition = 'transform .67s ease, width .67s ease, height .67s ease';
    // ancestor.style.transform = 'scale(2)';
    console.log('_target.left: ' + rect.left);
    console.log('_target.width: ' + _target.width);
    console.log('rect.center: ' + rCenterX);
    console.log('_target.top: ' + rect.top);
    console.log('_target.height: ' + _target.height);
    console.log('rect.middle: ' + rCenterY);
    console.log('window.innerWidth: ' + window.innerWidth);
    console.log('window.innerHeight: ' + window.innerHeight);
    console.log('translateX: ' + translateX);
    console.log('translateY: ' + translateY);
    ancestor.style.transform = ' translate(' + translateX + ',' + translateY + ')';
    console.log(translateX, translateY);
    ancestor.classList.add('zoomed');
    isZoomed = true;
    // Optional: Add animation for smooth zoom
}

// Function to zoom out
function zoomOut() {
    let ancestor = event.target.closest('[id*="Wrapper"]');
    ancestor.style.transformOrigin = 'center center';
    ancestor.style.transition = 'transform .67s ease, width .67s ease, height .67s ease';
    ancestor.style.transform = 'scale(1)';
    ancestor.classList.remove('zoomed');
    isZoomed = false;
    // Optional: Add animation for smooth zoom out
}
