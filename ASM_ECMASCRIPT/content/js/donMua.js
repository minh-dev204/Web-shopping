// render dữ liệu từ API
// lấy id user từ session để nó tìm đc đơn hàng dựa vào id user

let buildOrderTrDataUser = (oderDataUser, index) => {
   if (oderDataUser != null && typeof oderDataUser == "object") {
       const { id, customer_idkh , created_date, products } = oderDataUser;

       // Xây dựng HTML cho thông tin đơn hàng và sản phẩm
       let productsInfo = '';
       products.forEach(product => {
           productsInfo += ` <div class="box_top">
                                <div class="box_id">${id}</div>
                                <div class="box_img"><img width="80px" src="${product.product_img}" alt=""></div>
                                <div class="name_quantity">
                                    <div class="box_name">${product.product_name}</div>
                                    <div class="box_quantity"><span>x</span>${product.quantity}</div>
                                </div>
                                <div class="box_price">${product.unit_price}<span>đ</span></div>
                            </div>`
       });
       return `  <div class="body_box">
                        <div class="body_MainShop">
                            <div class="body_shop">
                                <div class="body_childShop">
                                    <div class="yeuThich">Yêu thích+</div>
                                    <div class="thoiTrang">Thời Trang MINH SHOP - NE...</div>
                                    <div class="xemShop">Xem Shop</div>
                                </div>
                                <div class="body_childShop">
                                    <div class="truck"><i class="fa-solid fa-truck-fast"></i></div>
                                    <div class="trangThai">Đơn hàng đang được giao đến bạn.</div>
                                </div>
                            </div>
                        </div>
                        <!-- list -->
                        <div class="body_box_top">
                           ${productsInfo}
                        </div>
                        <div class="body_box_bottom">
                            <div class="box_bottom_top">
                                <div class="tieuDeThanhTien">Thành Tiền:</div>
                                <div class="box_bottom_top_Price">200đ</div>
                            </div>
                            <div class="box_bottom_bottom">
                                <div class="ngayDathang">
                                    <div class="ndh">Ngày đặt hàng: <span class="date">${created_date}</span></div>
                                </div>
                                <div class="btnMuaLai">
                                    <button>Mua Lại</button>
                                </div>
                            </div>
                        </div>
                    </div>`
   }
}

let user = JSON.parse(sessionStorage.getItem("taikhoan"));
let idkh = user[0][0]
fetch(`http://localhost:3000/orders?customer_idkh=${idkh}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((json) => {
        let data = "";
        for (let i = json.length - 1; i >= 0; i--) { // xắp xếp lại đơn hàng từ dưới lên
            if (Object.hasOwnProperty.call(json, i)) {
                const element = json[i];
                data += buildOrderTrDataUser(element, i)  
            }
        }
        document.getElementById("body_listDonVe").innerHTML = data;
    })