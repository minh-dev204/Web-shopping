// click vào avatar để ẩn hiện admin đăng xuất
function onMouseover() {
    var submenu = document.getElementById("subnav_avatar");
    if (submenu.style.display == "block") {
        submenu.style.opacity = 0;
        setTimeout(function () {
            submenu.style.display = "none";
        }, 100);
    } else {
        submenu.style.display = "block";
        setTimeout(function () {
            submenu.style.opacity = 1;
        }, 100);
    }
}
// end ẩn hiện đăng xuất

// click vào cart chuyển tới trang giỏ hàng
function moveCart() {
    window.location.href = 'cart.html';
}


// load sản phẩm lên trang chủ
let buildTrData_sp = (sanphamData, index) => {
    if (sanphamData != null && typeof sanphamData === "object") {
        const { id, namesp, price, img, fkiddm, mota } = sanphamData;
        return `<div class="box" id="${id}">
                    <div class="image">
                        <img id="clickImg" width="180px" height="188px" src="../content/img/${img}" alt="">
                    </div>
                    <div class="note">
                        <p class="namesp">${namesp}</p>
                    </div>
                     <div class="price">
                        <div>
                            <span class="sp1">${price}</span>đ
                        </div>
                    <div>
                        <button class="buyNow">Thêm Giỏ</button>
                        <button class="linkDN"><a href="dangnhap.html">Thêm Giỏ</a></button>
                        <input class="inp_hidden" type="hidden" value="${id}">
                        <input class="inp_fkiddm_hidden" type="hidden" value="${fkiddm}">
                        <input class="inp_mota_hidden" type="hidden" value="${mota}">
                    </div>
                     </div>
                </div>`;
    }
};

// render dữ liệu sản phẩm
fetch('http://localhost:3000/sanPham')
    .then((reponse) => {
        return reponse.json();
    })
    .then((json) => {
        let datas = '';
        for (const key in json) {
            if (Object.hasOwnProperty.call(json, key)) {
                const sanPham = json[key];
                datas += buildTrData_sp(sanPham, key);
            }
        }
        document.getElementById("product").innerHTML = datas;

        noneBtnThemGio()
    })



// load dữ liệu danh mục lên trang chủ
let buildTrData_dm = (danhmucData, index) => {
    if (danhmucData != null && typeof danhmucData === "object") {
        const { id, name } = danhmucData;
        return ` <li class="li_chill_categury" value="${id}">${name}</li>`;
    }
};

// render dữ liệu danh mục
fetch('http://localhost:3000/danhMuc')
    .then((reponse) => {
        return reponse.json();
    })
    .then((json) => {
        let datas = '';
        for (const key in json) {
            if (Object.hasOwnProperty.call(json, key)) {
                const danhmuc = json[key];
                datas += buildTrData_dm(danhmuc, key);
            }
        }
        document.getElementById("danhmucIndex").innerHTML = datas;
    })


// kieem tra sesssion
function checkSession() {
    // ở bên phần dao giện cho các đăng nhập / đk, email , name đồ ẩn hết đi
    document.querySelector(".li_avatar").style.display = "none";
    document.querySelector(".name_avatar").style.display = "none";
    document.querySelector(".dn").style.display = "none";
    document.querySelector(".dk").style.display = "none";
    let data = sessionStorage.getItem("taikhoan");
    if (data) {
        // Chuyển đổi dữ liệu từ chuỗi JSON thành đối tượng JavaScript
        let userData = JSON.parse(data);
        // Truy cập name và email từ userData
        // [0][0] : số 0 đầu tiên là cái mảng thứ nhất "(được lưu trong session)"
        // số 0 thứ 2 là vị trí dữ liệu đc lưu trong mảng "(được lưu trong session)"
        let name = userData[0][1];
        let email = userData[0][2];
        // cho nó hiện lên lại
        document.querySelector(".li_avatar").style.display = "block";
        document.querySelector(".name_avatar").style.display = "block";
        document.querySelector(".sessionName").textContent = name;
        document.querySelector(".sessionName2").textContent = name;
        document.querySelector(".sessionEmail").textContent = email;

    } else {
        console.log("Session ko tồn tại");
        document.querySelector(".dn").style.display = "block";
        document.querySelector(".dk").style.display = "block";
    }
}

checkSession()


// khi người dùng chưa đăng nhập thì cái nút thêm giỏ chuyển thành
// nút chuyển đến trang đăng nhập
function noneBtnThemGio() {
    let buyNowButtons = document.querySelectorAll(".buyNow");
    let loginLink = document.querySelector(".linkDN");
    let cart_filter = document.querySelector(".cart-filter"); // nút cart
    let data = sessionStorage.getItem("taikhoan");
    if(data) {
        //nếu user đã đn
        loginLink.forEach((btnLink)=> {
            btnLink.style.display = "none";
        })
    }else {
        buyNowButtons.forEach((btnAdd) => {
            btnAdd.style.display = "none";
        })
        cart_filter.style.display = "none";
    }
}







