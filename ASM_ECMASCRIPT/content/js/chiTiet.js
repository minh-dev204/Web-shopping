let buildTrData_spct = (sanphamCTData, index) => {
    if (sanphamCTData != null && typeof sanphamCTData === "object") {
        const { id, namesp, price, img, fkiddm, mota } = sanphamCTData;
        return ` <div class="thongTin_SP_tablet">
                    <h1>${namesp}</h1>
                </div>
                <div class="anh_chitiet">
                    <img src="/content/img/${img}" alt="">
                </div>
                <div class="thongTin_SP">
                    <h1>${namesp}</h1>
                    <div class="flex_bnt">
                        <button>
                            <div class="bnt_item1">4,7K</div>
                            <div class="bnt_item2">
                                <i class="fa-solid fa-star fa-sm"></i>
                                <i class="fa-solid fa-star fa-sm"></i>
                                <i class="fa-solid fa-star fa-sm"></i>
                                <i class="fa-solid fa-star fa-sm"></i>
                                <i class="fa-solid fa-star fa-sm"></i>
                            </div>
                        </button>
                        <button>
                            <div class="bnt_item1">13,7K</div>
                            <div class="bnt_item2">Đánh Giá</div>
                        </button>
                        <button>
                            <div class="bnt_item1">13,7K</div>
                            <div class="bnt_item2">Đánh Giá</div>
                        </button>
                    </div>
                    <div class="khung">
                        <h3>12.12 Sale</h3>
                    </div>
                    <div class="Gia">
                        <div class="price_SP"><span>${price}</span>K</div>
                        <div class="_0voski">21% Giảm</div>
                    </div>
                    <div class="thongTin_chitiet">
                        <p>Mã Sản Phẩm : ${id}</p>
                        <p>Loại Hàng : ${fkiddm}</p>
                        <p id="mota_SP">Mô Tả : ${mota} </p>
                        <div class="nut">
                            <button class="closeNow">Đóng Ngay</button>
                        </div>
                    </div>
                </div>`;
    }
};
// // click vào name sp là lấy đc thông tin chi tiết sp
document.addEventListener('click', function (event) {
    if (event.target.matches('.namesp')) {
        let start_ct = event.target;
        let box_ct = start_ct.parentElement.parentElement;
        let id = box_ct.querySelector(".inp_hidden").value;

        fetch(`http://localhost:3000/sanPham/${id}`)
            .then((reponse) => {
                return reponse.json();
            })
            .then((product) => {
                let datas = buildTrData_spct(product, id);
                document.getElementById("tbody_ct").innerHTML = datas;
            })

        // 
        box_chitiet();
    }
})


// click vào name sp hiện ra box chi tiêts
function box_chitiet() {
    let box_chitietSP = document.querySelector(".main_chitietSP");
    let overlay_index = document.querySelector(".overlay_index");
    box_chitietSP.style.display = "block";
    overlay_index.style.display = "block";
    setTimeout(function () {
        box_chitietSP.style.opacity = 1;
        overlay_index.style.opacity = 1;
    }, 200)
}

// click vào nút đóng thì đóng box chi tiết
document.addEventListener("click", function (event) {
    if (event.target.matches(".closeNow")) {
        let box_chitietSP = document.querySelector(".main_chitietSP");
        let overlay_index = document.querySelector(".overlay_index");
        box_chitietSP.style.opacity = 0;
        overlay_index.style.opacity = 0;
        setTimeout(function () {
            box_chitietSP.style.display = "none";
            overlay_index.style.display = "none";
        }, 200)
    }
})
