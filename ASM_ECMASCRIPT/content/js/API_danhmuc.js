let buildTrData = (danhmucData, index) => {
    if (danhmucData != null && typeof danhmucData === "object") {
        const { id, name } = danhmucData;
        return `  <div class="flex_tr box-${id}" >
                   <div class="tr">
                        <div class="th row_id_danhmuc" style="width: 100px;">${id}</div>
                        <div class="th row_name_danhmuc" style="width: 700px;">${name}</div>
                        <div class="th" style="width: 300px;">
                            <button onclick="handleUpdate(${id})" class="bnt_list btn_edit">Sửa</button>
                            <button onclick="handleDelete(${id})" class="bnt_list1 btn_delete">Xóa</button>
                        </div>
                    </div> 
                   </div>`;
    }
};


// render dữ liệu
fetch('http://localhost:3000/danhMuc')
    .then((reponse) => {
        return reponse.json();
    })
    .then((json) => {
        let datas = '';
        for (const key in json) {  // duyệt cái mảng json
            if (Object.hasOwnProperty.call(json, key)) {
                const danhmuc = json[key];
                datas += buildTrData(danhmuc, key);
            }
        }
        document.getElementById("tbody-user").innerHTML = datas;
        createAPI();
    })


function createAPI() {
    let bnt_create = document.querySelector("#bnt-create");
    bnt_create.addEventListener("click", function () {
        // lấy dữ liệu form khi người dùng create
        let name = document.querySelector("input[name=form-tenloai]").value;

        let data = { name };

        fetch("http://localhost:3000/danhMuc", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })  // đoạn này là nó gửi dữ liệu lên json-sever r

            .then((reponse) => {  // .then lần 1 để lấy đc cái reponse của nó
                return reponse.json()
            })
            .then((json) => {  // bước này gọi lại fetch để render dữ liệu ra
                fetch("http://localhost:3000/danhMuc")
                    .then((reponse) => {
                        return reponse.json();
                    })
                    .then((json) => {
                        let datas = '';
                        for (const key in json) {
                            if (Object.hasOwnProperty.call(json, key)) {
                                const danhmuc = json[key];
                                datas += buildTrData(danhmuc, key);
                            }
                        }
                        document.getElementById("tbody-user").innerHTML = datas;
                    })

            })
        //click vào create danh mục thì cho nó ra khỏi màn hình chính
        let form_create = document.querySelector(".form_create");
        let computedStyle = window.getComputedStyle(form_create);
        let topValue = computedStyle.getPropertyValue("top");
        if (topValue === "0px") {
            form_create.style.top = "-100%";
        } else {
            form_create.style.top = "0";
        };

    })
}

// del
function handleDelete(id) {
    fetch(`http://localhost:3000/danhMuc/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })  // xong đoạn này là xóa trên json-sever rồi mà chưa xóa khỏi html, phải load lại nó ms xóa
    // do đó khi xóa xong thì lấy cái elemnt đó dựa vào id và gọi hàm remove() để xóa khỏi dom
    let box = document.querySelector(".box-" + id);
    box.remove();
}


// update
function handleUpdate(id) {
    let box = document.querySelector(".box-" + id);
    let name_edit = box.querySelector(".row_name_danhmuc").textContent;

    document.querySelector("input[name=form-tenloai-update]").value = name_edit;
    let updateBtn = document.getElementById("bnt-update");
    updateBtn.addEventListener("click", function () {
        console.log("ok");
        let name = document.querySelector("input[name=form-tenloai-update]").value;
        let data = { name };
        fetch(`http://localhost:3000/danhMuc/${id}`, {
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
                fetch("http://localhost:3000/danhMuc")
                    .then((reponse) => {
                        return reponse.json();
                    })
                    .then((json) => {
                        let datas = '';
                        for (const key in json) {
                            if (Object.hasOwnProperty.call(json, key)) {
                                const danhmuc = json[key];
                                datas += buildTrData(danhmuc, key);
                            }
                        }
                        document.getElementById("tbody-user").innerHTML = datas;
                    })
            })
        // //click vào update danh mục thì cho nó ra khỏi màn hình chính
        let form_update_dm = document.querySelector(".form_update");
        let computedStyle_dm = window.getComputedStyle(form_update_dm);
        let topValue_dm = computedStyle_dm.getPropertyValue("top");
        if (topValue_dm === "0px") {
            form_update_dm.style.top = "-100%";
        } else {
            form_update_dm.style.top = "0";
        };
    })
}



