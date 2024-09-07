let buildTrData_sp = (sanphamData, index) => {
    if (sanphamData != null && typeof sanphamData === "object") {
        const { id, namesp, price, img, fkiddm, mota } = sanphamData;
        return `<div class="tr_sp boxSP-${id}">
                    <div class="td row_id_sanpham" style="width: 100px;">${id}</div>
                    <div class="td row_name_sanpham" style="width: 300px;">${namesp}</div>
                    <div class="td" style="width: 200px;"><img width="70px" src="../content/img/${img}" alt=""></div>
                    <div class="td row_price_sanpham" style="width: 100px;">${price}</div>
                     <div class="td row_fkiddm" style="width: 100px;">${fkiddm}</div>
                      <input class="row_mota_sanpham" type="hidden" value="${mota}">
                    <div class="td" style="width: 300px;">
                        <button onclick="handleUpdate_sp(${id})" class="bnt_list btn_edit_sp">Sửa</button>
                        <button onclick="handleDelete_sp(${id})" class="bnt_list1 btn_del_sp">Xóa</button>
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
                console.log(datas);
            }
        }
        document.getElementById("tbody_sp").innerHTML = datas;
        create_spAPI();
        // handleDelete_sp();
        // setValue_spUpdate();
    })


// tạo sản phẩm
function create_spAPI() {
    let bnt_create_sp = document.querySelector("#bnt-create_sp");
    bnt_create_sp.addEventListener("click", function () {
        // lấy dữ liệu form khi người dùng create
        let id = document.querySelector("input[name=form-idsp]").value;
        let namesp = document.querySelector("input[name=form-namesp]").value;
        let price = document.querySelector("input[name=form-price]").value;
        let imgInput = document.querySelector("input[name=form-img]");
        let img = imgInput.files[0].name;  // lấy tên ảnh
        let mota = document.querySelector("textarea[name=form-mota]").value;
        let selectElement = document.querySelector(".select_option_create");
        let fkiddm = selectElement.value;

        let data = { id, namesp, price, img, mota, fkiddm };
        // console.log(data);

        fetch("http://localhost:3000/sanPham", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((reponse) => {
                return reponse.json()
            })
            .then((json) => {  // bước này gọi lại fetch để render dữ liệu ra
                fetch("http://localhost:3000/sanPham")
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
                        document.getElementById("tbody_sp").innerHTML = datas;
                        // handleDelete_sp();
                        // setValue_spUpdate();
                    })

            })
        // //click vào create danh mục thì cho nó ra khỏi màn hình chính
        let form_create_sp = document.querySelector(".form_create_sp");
        let computedStyle_sp = window.getComputedStyle(form_create_sp);
        let topValue_sp = computedStyle_sp.getPropertyValue("top");
        if (topValue_sp === "0px") {
            form_create_sp.style.top = "-100%";
        } else {
            form_create_sp.style.top = "0";
        };


    })

    // 

}

function handleDelete_sp(id) {
    fetch(`http://localhost:3000/sanPham/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let box_SP = document.querySelector(".boxSP-" + id);
    box_SP.remove();
}

function handleUpdate_sp(id) {
    // lấy cái box id của sản phẩm đc click
    let box_SP = document.querySelector(".boxSP-" + id);
    // dựa vào cái box_sp để qurry các thuộc tính
    let id_edit = box_SP.querySelector(".row_id_sanpham").textContent;
    let namesp_edit = box_SP.querySelector(".row_name_sanpham").textContent;
    let price_edit = box_SP.querySelector(".row_price_sanpham").textContent;
    let mota_edit = box_SP.querySelector(".row_mota_sanpham").value;
    let fkiddm_edit = box_SP.querySelector(".row_fkiddm").textContent;


    // và đưa các dữ liệu trên vào form update
    document.querySelector("input[name=form-idsp-update]").value = id_edit;
    document.querySelector("input[name=form-namesp-update]").value = namesp_edit;
    document.querySelector("input[name=form-price-update]").value = price_edit;
    document.querySelector("textarea[name=form-mota-update]").value = mota_edit;
    let updateBtn_sp = document.getElementById("bnt_update_sp");
    updateBtn_sp.addEventListener("click", function () {
        console.log("ok");
        let id = document.querySelector("input[name=form-idsp-update]").value;
        let namesp = document.querySelector("input[name=form-namesp-update]").value;
        let price = document.querySelector("input[name=form-price-update]").value;
        let imgInput = document.querySelector("input[name=form-img-update]");
        let img = imgInput.files[0].name;  // lấy tên ảnh
        let mota = document.querySelector("textarea[name=form-mota-update]").value
        let selectElement = document.querySelector(".select_option_update");
        let fkiddm = selectElement.value;

        let data = { id, namesp, price, img, mota, fkiddm };

        fetch(`http://localhost:3000/sanPham/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((reponse) => {
                return reponse.json();
            })
            .then(() => {
                fetch("http://localhost:3000/sanPham")
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
                        document.getElementById("tbody_sp").innerHTML = datas;
                    })
            })
        // //click vào update sản phẩm thì cho nó ra khỏi màn hình chính
        let form_update_sp = document.querySelector(".form_update_sp");
        let computedStyle_sp = window.getComputedStyle(form_update_sp);
        let topValue_sp = computedStyle_sp.getPropertyValue("top");
        if (topValue_sp === "0px") {
            form_update_sp.style.top = "-100%";
        } else {
            form_update_sp.style.top = "0";
        };
    })
}




// lấy mã loại của danh mục để insert vào sản phẩm
let build_danhmuc_sp = (danhmuc_spData, index) => {
    if (danhmuc_spData != null && typeof danhmuc_spData === "object") {
        const { id, name } = danhmuc_spData;
        return `<option class="group_inp option" value="${id}">${name}</option>`;
    }
};

fetch(' http://localhost:3000/danhMuc')
    .then((reponse) => {
        return reponse.json();
    })
    .then((json) => {
        let datas_sp = '';
        for (const key in json) {
            if (Object.hasOwnProperty.call(json, key)) {
                const danhmuc_fkid = json[key];
                datas_sp += build_danhmuc_sp(danhmuc_fkid, key);
            }
        }
        document.querySelector(".select_option_create").innerHTML = datas_sp;
        document.querySelector(".select_option_update").innerHTML = datas_sp;
    })
