// tìm kiếm sản phẩm
function searchAPI() {
    let timer = undefined;
    let search = document.querySelector(".search");
    search.addEventListener("keyup", function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            let input_search = document.querySelector(".search").value;
            fetch(`http://localhost:3000/sanPham?namesp_like=${input_search}`)
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
                })
        }, 1500)
    })
}
searchAPI();



// sắp xếp giá sản phẩm theo price từ cao đến thấp
let sort_height = document.querySelector(".price-hight");
sort_height.addEventListener("click", function () {
    fetch("http://localhost:3000/sanPham?_sort=price&_order=desc") // Hoặc có thể dùng ?_sort=id&_order=asc để sắp xếp từ bé đến lớn
        .then((response)=> {
            return response.json();
        })
        .then((json)=> {
            let datas = '';
            for (const key in json) {
                if (Object.hasOwnProperty.call(json, key)) {
                    const sanPham = json[key];
                    datas += buildTrData_sp(sanPham, key);
                }
            }
            document.getElementById("product").innerHTML = datas;
        });
});

// sắp xếp giá sản phẩm theo price từ thấp đến cao
let sort_low = document.querySelector(".price-low");
sort_low.addEventListener("click", function () {
    fetch("http://localhost:3000/sanPham?_sort=price&_order=asc") // Hoặc có thể dùng ?_sort=id&_order=asc để sắp xếp từ bé đến lớn
        .then((response)=> {
            return response.json();
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
        });
});



// sắp xếp sản phẩm theo danh mục
document.addEventListener('click', function (event) {
    if (event.target.matches('.li_chill_categury')) {
        // let danhmuc = document.querySelectorAll(".li_chill_categury");
        let danhmucStart = event.target;
        let id = danhmucStart.value;
        console.log(id);
        fetch(`http://localhost:3000/sanPham?fkiddm=${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                let datas = '';
                for (const key in json) {
                    if (Object.hasOwnProperty.call(json, key)) {
                        const sanPham = json[key];
                        datas += buildTrData_sp(sanPham, key);
                    }
                }
                console.log(datas);
                document.getElementById("product").innerHTML = datas;
            })
    }
})