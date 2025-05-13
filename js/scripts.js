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
    const wrapper = document.getElementById("carouselWrapper");

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


// var elements = document.querySelectorAll('.solution');
// elements.forEach((element) => {
//     element.addEventListener('click', function () {
//         const list = element.classList;
//         // list.toggle('zin');
//         // list.toggle('zout');
//         console.log(list);
//     });
// }
// );

// // ChatGPT v1

// document.addEventListener('DOMContentLoaded', function () {
//     const carousel = document.getElementById('carouselSNB');

//     carousel.addEventListener('click', function () {
//         carousel.classList.toggle('carousel-fullscreen');
//         document.body.classList.toggle('overflow-hidden');
//     });
// });

// // end ChatGPT v1



// // ChatGPT v2

// document.addEventListener("DOMContentLoaded", function () {
//   const carousels = document.querySelectorAll(".carousel");

//   carousels.forEach((carousel) => {
//     carousel.addEventListener("click", () => {
//       if (!carousel.classList.contains("fullscreen-carousel")) {
//         carousel.classList.add("fullscreen-carousel");
//         document.body.classList.add("no-scroll");
//       } else {
//         carousel.classList.remove("fullscreen-carousel");
//         document.body.classList.remove("no-scroll");
//       }
//     });
//   });
// });

// // end ChatGPT v2



// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//         carousel.classList.remove('carousel-fullscreen');
//         document.body.classList.remove('overflow-hidden');
//     }
// });

// const wrapper = document.getElementById('carouselWrapper');
// const overlay = document.getElementById('carouselOverlay');

// function toggleCarouselExpansion() {
//     wrapper.classList.toggle('expanded');
//     overlay.classList.toggle('active');
// }

// // Toggle on click
// wrapper.addEventListener('click', (e) => {
//     // Avoid toggling if a button was clicked
//     if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) {
//         return;
//     }
//     toggleCarouselExpansion();
// });

// // Also allow overlay click to close
// overlay.addEventListener('click', toggleCarouselExpansion);


  const carousel = document.getElementById('carouselSNB');
  const modal = document.getElementById('carouselModal');
  const modalContent = document.getElementById('modalContent');
  const modalBackdrop = document.getElementById('modalBackdrop');

  let clonedCarousel = null;

  function openModal() {
    if (!clonedCarousel) {
      clonedCarousel = carousel.cloneNode(true);
      modalContent.appendChild(clonedCarousel);
    }
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });
  }

  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      modalContent.innerHTML = '';
      clonedCarousel = null;
    }, 500);
  }

  // Open modal on carousel click
  carousel.addEventListener('click', (e) => {
    // Prevent opening modal when clicking navigation buttons
    if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) {
      return;
    }
    openModal();
  });

  // Close modal on backdrop click
  modalBackdrop.addEventListener('click', closeModal);