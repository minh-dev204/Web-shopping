load_sp_bill();
function load_sp_bill() {
    let box_listSpBillCart = document.querySelector(".box_listSpBillCart");
    box_listSpBillCart.innerHTML = "";
    let bill_cart = JSON.parse(sessionStorage.getItem("muaNgay"));
    // console.log(bill_cart);
    for (let i = 0; i < bill_cart.length; i++) {
        // console.log(bill_cart.length);
        let box_BillSp = document.createElement("div");
        box_BillSp.setAttribute("class", "boxMain_billsp");

        let content_bill =
            '<div class="box_BillSp">' +
            '<div class="Bill_tenSP_img">' +
            '<img class="Bill_img" width="60px" height="60px" src="' + bill_cart[i][0] + '">' +
            '<span class="tensp">' + bill_cart[i][1] + '</span>' +
            '</div>' +
            '<div class="Bill_donGia">' + bill_cart[i][2] + '</div>' +
            '<input class="inp_hidden_bill" type="hidden" value="' + bill_cart[i][3] + '">'+
            '<div class="Bill_soLuong"><input class="inp_soLuong" type="number" value="1"></div>' +
            '<div class="Bill_thanhTien">120</div>' +
            '</div>' +
            '<div class="boxMain_loinhan">' +
            '<div class="box_loinhanFlex">' +
            '<div class="box1_loinhan">' +
            '<div class="form_group_loinhan">' +
            '<label for="">Lời Nhắn :</label>' +
            '<input type="text" placeholder="Lưu ý cho người bán">' +
            '</div>' +
            '</div>' +
            '<div class="box2_vanchuyen">' +
            '<div class="box2_vanchuyen1">' +
            '<div class="nameDonvi">Đơn vị vận chuyển : </div>' +
            '<div class="donvivanchuyen">SPX Express SPXVN035678744062</div>' +
            '</div>' +
            '<div class="box2_vanchuyen2">' +
            '<div class="nameDonvi">Được đồng kiểm <i class="fa-solid fa-question fa-xs"></i></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="tongSoTien1SP">' +
            '<div class="tongtien1box">' +
            '<span class="spanText">Tổng số tiền (<span class="span_soluong">1</span> sản phẩm):</span>' +
            '<div class="price_oneSP">199</div>' +
            '</div>' +
            '</div>';
        // '<input class="inp_hidden_bill" type="hidden" value="' + arr1[i][3] + '">';
        box_BillSp.innerHTML = content_bill;
        box_listSpBillCart.append(box_BillSp);
        // console.log(content_bill);
    }
    tinhtienBill();
}

function tinhtienBill() {
    let box_BillSp = document.querySelectorAll(".boxMain_billsp");
    let tong = 0;
    for (let i = 0; i < box_BillSp.length; i++) {
        let inpPrice = box_BillSp[i].querySelector(".Bill_donGia").textContent;
        let inpSoluong = box_BillSp[i].querySelector(".inp_soLuong").value;
        let prices = inpPrice * inpSoluong;
        tong = tong += prices;
        //tính tiền của mỗi sản phẩm

        let Bill_thanhTien = box_BillSp[i].querySelector(".Bill_thanhTien");
        Bill_thanhTien.innerHTML = prices;

        let price_oneSP = box_BillSp[i].querySelector(".price_oneSP");
        price_oneSP.innerHTML = prices;
    }

    var totalTongTien = document.querySelector(".tongtienBill");
    totalTongTien.innerHTML = tong;
    inputChange();

}
// hàm thay đổi số lượng
function inputChange() {
    let box_BillSp = document.querySelectorAll(".box_BillSp");
    for (let i = 0; i < box_BillSp.length; i++) {
        var inputValue = box_BillSp[i].querySelector(".inp_soLuong");
        inputValue.addEventListener("change", function () {
            tinhtienBill();
        })
    }
}



// fetch để gửi đơn hàng lên sever json
function bill_spAPI() {
    // lấy dữ liệu User từ session  và cho nó hiện ra màn hinh
    let duLieu = sessionStorage.getItem("taikhoan");
    let userData = JSON.parse(duLieu);
    let customer_idkh = userData[0][0];   // số 0 đầu tiên là cái mảng đầu tiên. số 0 phía sau là vị trí của các giá trịs
    let customer_name = userData[0][1];
    let customer_email = userData[0][2];
    let customer_phone_number = userData[0][4];
    let customer_address = userData[0][5];
    document.querySelector(".nameOder").textContent = customer_name;
    document.querySelector(".emailOder").textContent = customer_email;
    document.querySelector(".telOder").textContent = customer_phone_number;
    document.querySelector(".addressOder").textContent = customer_address;
    // tạo sk click
    let btn_bill = document.querySelector(".btn_bill");
    btn_bill.addEventListener("click", function () {
        // Lấy thông tin của ngày và tháng hiện tại
        let currentDate = new Date();
        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1

        // Format ngày và tháng theo định dạng mong muốn (vd: 13-3-2024)
        let created_date = currentDay + '-' + currentMonth + '-' + currentDate.getFullYear();
        let products = []; // Tạo một mảng để lưu trữ thông tin các sản phẩm

        // lấy sp
        let box_BillSp = document.querySelectorAll(".box_BillSp");
        for (let i = 0; i < box_BillSp.length; i++) {
            let product_id = box_BillSp[i].querySelector(".inp_hidden_bill").value;
            let quantity = box_BillSp[i].querySelector(".inp_soLuong").value;
            let unit_price = box_BillSp[i].querySelector(".Bill_donGia").textContent;
            let product_img = box_BillSp[i].querySelector(".Bill_img").src;
            let product_name = box_BillSp[i].querySelector(".tensp").textContent;
            products.push({ "product_id": product_id, "quantity": quantity, "unit_price": unit_price,"product_img": product_img, "product_name": product_name });
        }
        console.log(products);
        let data = { customer_idkh, created_date, products }
        console.log(data);
        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        Mesenger_pay();

    })
};
bill_spAPI();



function overlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    setTimeout(function () {
        overlay.style.opacity = 1;
    }, 300);
}

// hiện thị thông báo mua hàng thành công
function Mesenger_pay() {
    var out = document.getElementById("Mesenger_thongBao");
    console.log(out);
    if (out.style.display === "block") {
        out.style.opacity = 0;
        setTimeout(function () {
            out.style.display = "none";
        }, 300);
    } else {
        out.style.display = "block";
        setTimeout(function () {
            out.style.opacity = 1;
        }, 300);
        overlay();
    }
}

// load lại trang khi click ok
function loadWhenClickOK() {
    // location.reload();
    window.location.href = 'index.html';
}
