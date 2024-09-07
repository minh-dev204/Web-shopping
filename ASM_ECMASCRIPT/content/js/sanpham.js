// click vào thêm mới sản phẩm hiện ra box thêm mới
let btn_themmoi_sp = document.querySelector(".themmoi_sp");
btn_themmoi_sp.addEventListener("click", function () {
    let form_create_sp = document.querySelector(".form_create_sp");
    let computedStyle_sp = window.getComputedStyle(form_create_sp);
    let topValue_sp = computedStyle_sp.getPropertyValue("top");
    if (topValue_sp === "0px") {
        form_create_sp.style.top = "-100%";
    } else {
        form_create_sp.style.top = "0";
    }

    // cho giá trị khi click để hiện box thêm ms là rỗng
    document.querySelector("input[name=form-idsp]").value = "";
    document.querySelector("input[name=form-namesp]").value = "";
    document.querySelector("input[name=form-price]").value = "";
    document.querySelector("input[name=form-img]").value = "";
})

// click vào edit hiện ra box update sản phẩm
// function editSanPham() {
//     let form_update_sp = document.querySelector(".form_update_sp");
//     let computedStyle2_sp = window.getComputedStyle(form_update_sp);
//     let topValue2_sp = computedStyle2_sp.getPropertyValue("top");
//     if (topValue2_sp === "0px") {
//         form_update_sp.style.top = "-100%";
//     } else {
//         form_update_sp.style.top = "0";
//     }
// }


document.addEventListener('click', function (event) {
    if (event.target.matches('.btn_edit_sp')) {
        let form_update_sp = document.querySelector(".form_update_sp");
        let computedStyle2_sp = window.getComputedStyle(form_update_sp);
        let topValue2_sp = computedStyle2_sp.getPropertyValue("top");
        if (topValue2_sp === "0px") {
            form_update_sp.style.top = "-100%";
        } else {
            form_update_sp.style.top = "0";
        }
     }
})
