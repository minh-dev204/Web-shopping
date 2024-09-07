// click vào thêm mới hiện ra box thêm mới
let btn_themmoi = document.querySelector(".themmoi");
btn_themmoi.addEventListener("click", function () {
    let form_create = document.querySelector(".form_create");
    let computedStyle = window.getComputedStyle(form_create);
    let topValue = computedStyle.getPropertyValue("top");
    if (topValue === "0px") {
        form_create.style.top = "-100%";
    } else {
        form_create.style.top = "0";
    }

    // cho giá trị khi click để hiện box thêm ms là rỗng
    document.querySelector("input[name=form-id]").value = "";
    document.querySelector("input[name=form-tenloai]").value = "";
})


// click vào edit hiện ra box update
document.addEventListener('click', function (event) {
    if (event.target.matches('.btn_edit')){
        let form_update = document.querySelector(".form_update");
        let computedStyle2 = window.getComputedStyle(form_update);
        let topValue2 = computedStyle2.getPropertyValue("top");
        if (topValue2 === "0px") {
            form_update.style.top = "-100%";
        } else {
            form_update.style.top = "0";
        }
    }
})


// click vào nút thoát thì về trang chủ
function outAdmin() {
    window.location.href = '../index.html';
}




