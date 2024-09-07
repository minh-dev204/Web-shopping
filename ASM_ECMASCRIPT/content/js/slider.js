// slider show
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// end slider


// Sự kiện hover vào cart để hiển thị
function eventHoverCart() {
    let cartShopping = document.querySelector('.fa-cart-shopping');
    let submenuCart = document.querySelector(".submenu_cart");

    cartShopping.addEventListener("mouseenter", function () {
        submenuCart.style.display = "block";
        setTimeout(()=> {
            submenuCart.style.opacity = 1;
        },200)
    });

    // Sự kiện khi chuột rời khỏi cart để ẩn
    submenuCart.addEventListener("mouseleave", function () {
        submenuCart.style.opacity = 0;
        setTimeout(() => {
            submenuCart.style.display = "none";
        }, 200)
    });
}

eventHoverCart();

