window.onload = function () {
    document.querySelector('#preloader').style.display = 'none';
};

$(function () {

    "use strict";

    //===== Sticky
    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").addClass("d-none");
        } else {
            $(".header_navbar").removeClass("d-none");
            $(".header_navbar").addClass("sticky");
            $(".header_navbar img").attr("src", "assets/images/logo-2.png");
        }
    });
    
    
    //===== Section Menu Active
    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });
    
    //===== close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });


    //====== Count Down
    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<div class="coming_soon_count d-flex justify-content-between pt-20"><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%D</span><p class="times">Giorni</p></div></div><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%H</span><p class="times">Ore</p></div></div><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%M</span><p class="times">Minuti</p></div></div><div class="single_count d-flex align-items-center justify-content-center mt-30"><div class="count_content"><span class="count">%S</span><p class="times">Secondi</p>                            </div></div></div>'));
        });
    });
    
    //===== SwiperJS
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1.2,  // 2.5
        spaceBetween: 10,
        centeredSlides: true,
        loop: true, // Enable looping
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        grabCursor: true,
        initialSlide: Math.floor(Math.random() * document.querySelectorAll('.mySwiper .swiper-slide').length), // Random initial slide
        breakpoints: {
            767: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
        },
    });

    //===== Modal regalo di nozze
    const exampleModal = document.getElementById('exampleModal')
    if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const destination = button.getAttribute('data-bs-destination')
        // If necessary, you could initiate an Ajax request here
        // and then do the updating in a callback.

        // Update the modal's content.
        const modalTitle = exampleModal.querySelector('.modal-title')
        modalTitle.textContent = `${destination}`
    })
    }
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = new FormData(this);
    var jsonData = Object.fromEntries(formData.entries());

    // Send data to make.com webhook
    var webhookUrl = "https://hook.eu2.make.com/o7hpg25tb51l4msn283eyvdfrbe6ssxa";
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.text())
    .then(
        document.getElementById('contact-title-row').classList.add('d-none'),
        document.getElementById('contact-form').classList.add('d-none'),
        document.getElementById('contact-ty-row').classList.remove('d-none'),
    )
    .catch(error => console.error('Error:', error));
});

document.getElementById('copy-iban-btn').addEventListener('click', function() {
    const iban = 'IT39Z0306968950100000002633';
    navigator.clipboard.writeText(iban).then(() => {
        const button = document.getElementById('copy-iban-btn');
        button.textContent = 'Copiato!';

        setTimeout(() => {
            button.textContent = 'Copia IBAN';
        }, 3000);
    });
});