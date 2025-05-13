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
    const carousel = document.querySelector("#carouselSNB");
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

let isZoomed = false; // Variable to track zoom state

// Function to toggle zoom
function toggleZoom() {
  const carouselWrapper = document.getElementById("carouselWrapper");

  if (isZoomed) {
    // If already zoomed, zoom out
    carouselWrapper.classList.remove('zoomed');
    isZoomed = false;
  } else {
    // If not zoomed, zoom in
    carouselWrapper.classList.add('zoomed');
    isZoomed = true;
  }
}

// Prevent zoom on arrow clicks
function preventZoomOnArrows(event) {
  if (isZoomed) {
    event.stopPropagation(); // Prevent zoom toggle when arrow is clicked
  }
}

// Handle next/prev slide button clicks (exclude zoom effect)
document.querySelector('.carousel-control-prev').addEventListener('click', (event) => {
  preventZoomOnArrows(event);
});

document.querySelector('.carousel-control-next').addEventListener('click', (event) => {
  preventZoomOnArrows(event);
});

// Handle image clicks to toggle zoom
document.querySelectorAll('.carousel-item img').forEach(img => {
  img.addEventListener('click', (event) => {
    toggleZoom(); // Toggle zoom in or out on image click
    event.stopPropagation(); // Prevent event bubbling to parent elements
  });
});
