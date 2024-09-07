// đáng lẽ định querySelector tất cả nút buyNow rồi, 
//nhưng dữ liệu trên json-sever nó ra châm hơn nên querySelector(."buyNow") nó ko tìm đc
let arr = [];
document.addEventListener('click', function (event) { //nên ms dùng document.addEventListener
    if (event.target.matches('.buyNow')) {  // nó sẽ click vào 1 trên cái màn hình, nếu nó click vào nút buyNow thì nó sẽ khớp
        // vì do tui dùng hàm matches để xem nó có khớp hay ko
        let start = event.target;
        let Products = start.parentElement.parentElement.parentElement;
        let ProductImg = Products.querySelector("img").src;
        let ProductName = Products.querySelector(".namesp").innerText;
        let ProductPrice = Products.querySelector(".sp1").innerText;
        let idsp_inp = Products.querySelector(".inp_hidden").value;

        let list = [ProductImg, ProductName, ProductPrice, idsp_inp];

        arr.unshift(list);// unshift nó thêm vào mảng từ dưới lên
        count();
        localStorage.setItem("sanpham", JSON.stringify(arr));
        addCart();
    }
});


// addCart()
function addCart() {
    let bodyCart = document.querySelector(".body_cart");
    bodyCart.innerHTML = "";
    let arr1 = JSON.parse(localStorage.getItem("sanpham"));
    if (arr1.length === 0) {
        const messageImgCart = document.getElementById("main_messager");
        messageImgCart.style.display = "block";
    } else {
        for (let i = 0; i < arr1.length; i++) {
            let addtr = document.createElement("div");
            addtr.setAttribute("class", "item_body_cart");
            let content = '<div class="BC1"><input type="checkbox" name="" class="checkbox"></div>' +
                '<div class="BC2"><img width="80px" src="' + arr1[i][0] + '" alt=""></div>' +
                '<div class="BC3">' + arr1[i][1] + '</div>' +
                '<div class="BC4 priceCart">' + arr1[i][2] + '</div>' +
                '<div class="BC5">' +
                '<button onclick="removeItem(' + i + ')" class="bnt_del_cart">Xóa</button>' +
                ' <input class="inp_hidden" type="hidden" value="' + arr1[i][3] + '">' +
                '</div>';
            addtr.innerHTML = content;
            bodyCart.append(addtr);
        }
        muaNgay();
        tongtien();
        count();
    }
}

// xóa sp
function removeItem(index) {
    let arr = JSON.parse(localStorage.getItem("sanpham"));
    arr.splice(index, 1);
    localStorage.setItem("sanpham", JSON.stringify(arr));
    addCart();
    tongtien();
}

// hiện sản phẩm sau khi load
window.addEventListener("load", function () {
    if (this.localStorage.getItem("sanpham")) {
        arr = JSON.parse(this.localStorage.getItem("sanpham"));
        addCart(); // cập nhật lại giỏ hàng vs dữ liệu đã lấy từ localStorage
    }
});




// đếm số lượng sản phẩm trong giỏ hàng
function count() {
    document.querySelector(".count_cart").innerHTML = arr.length;
    localStorage.setItem("count_cart", arr.length);
}

// sk cập nhật số lượng sản phẩm thêm giỏ hàng
window.addEventListener("load", function () {
    if (this.localStorage.getItem("count_cart")) {
        let cartItemCount = localStorage.getItem("count_cart");
        document.querySelector(".count_cart").innerHTML = cartItemCount
        count(); //cập nhật lại số lượng spF
    }
})



// tính tổng tiền
function tongtien() {
    let checkboxes = document.querySelectorAll(".checkbox");
    // console.log(checkboxes);
    let item_body_cart = document.querySelectorAll(".item_body_cart");
    let total = 0;

    checkboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) { // Nếu checkbox này được chọn
                let price = parseFloat(item_body_cart[index].querySelector(".priceCart").textContent);
                total += price;
            } else { // Nếu checkbox này bị bỏ chọn
                let price = parseFloat(item_body_cart[index].querySelector(".priceCart").textContent);
                total -= price;
            }

            let tongtien = document.querySelector(".tongtien");
            tongtien.innerHTML = total; // Hiển thị tổng tiền với hai số thập phân
        });
    });
}

let mangMuaNgay = [];
function muaNgay() {
    let divMuaNgay = document.querySelector(".t4_muaNgay");  // lấy dom nút mua ngay
    let checkboxes = document.querySelectorAll(".checkbox");  // lấy dom All nút checkbox

    divMuaNgay.addEventListener("click", function () {
        let checkedCount = 0;
        checkboxes.forEach(function (checkbox, index) {
            if (checkbox.checked) {  //nếu checkbox nào đc chọn thì nó sẽ lấy elemtn item_body_cart đó dựa vào index
                let item = document.querySelectorAll(".item_body_cart")[index];
                let productName = item.querySelector(".BC3").textContent;
                let productPrice = item.querySelector(".priceCart").textContent;
                let productImage = item.querySelector(".BC2 img").src;
                let idsp = item.querySelector(".inp_hidden").value;
                // nó sẽ lấy đc name,price,ingae,idsp
                
                let listMuaNgay = [productImage, productName, productPrice, idsp]
                mangMuaNgay.push(listMuaNgay)
                // đưa dữ liệu lên session
                sessionStorage.setItem("muaNgay", JSON.stringify(mangMuaNgay));

                checkedCount++; // Tăng giá trị biến khi checkbox được chọn
            }
        });
        console.log(checkedCount);
        // Kiểm tra nếu không có sản phẩm nào được chọn
        if (checkedCount === 0) {
            alert("Vui lòng chọn sản phẩm trước khi mua hàng!");
        } else {
            window.location.href = "thanhToan.html";
        }
    })
}



// sự kiện hiển thị session lên cart
function addCart_submenu() {
    var ul_submenu_cart = document.querySelector(".ul_submenu_cart");
    // lấy DOM thẻ ul
    ul_submenu_cart.innerHTML = "";
    var arr = JSON.parse(localStorage.getItem("sanpham"));
    console.log(arr);
    // xuất locaStorage ra rồi dùng for để duyệt cái mảng đó
    // var displayLimit = Math.min(arr.length, 5);  // giới hạn tối đa sp là 5
    if (arr.length === 0) { //nếu có SP thì ko hiện thị cái này
        var messageLi = document.getElementById("messger");
        messageLi.style.display = "block";
        // messageLi.textContent = "ko có sản phẩm nào";
        // ul_submenu_cart.append(messageLi);
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            var messageLi = document.getElementById("messger");
            messageLi.style.display = "none";
            var createLi = document.createElement("li");
            // tạo 1 thẻ li
            createLi.setAttribute("class", "li_submenu_cart");
            // thêm thuộc tính astribute cho nó

            var subCart = '<li class="li_submenu_cart">' +
                '<img src="' + arr[i][0] + '" alt="">' +
                '<div class="name_sub_cart">' + arr[i][1] + '</div>' +
                '<div class="price_sub_cart">' + arr[i][2] + "đ" + '</div>' +
                '</li>';
            // cho subcart = chuỗi code trên
            createLi.innerHTML = subCart;

            ul_submenu_cart.append(createLi);
            // thêm vào 1 thẻ mới
        }
    }
}
addCart_submenu();

// sk hover vào logo thì xuất giỏ hàng đã lưu ra
const logo_cart = document.querySelector(".cart-filter");
console.log(logo_cart);
logo_cart.addEventListener("mouseover", function () {
    if (localStorage.getItem("sanpham")) {
        arr = JSON.parse(localStorage.getItem("sanpham"));
        addCart_submenu();
    }
});