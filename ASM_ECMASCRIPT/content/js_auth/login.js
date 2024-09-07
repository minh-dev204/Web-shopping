function handleLogin() {
    let btn_login = document.querySelector(".btn_login");
    btn_login.addEventListener("click", () => {
        let email = document.querySelector("input[name = emailLogin]").value;
        let pass = document.querySelector("input[name = passLogin]").value;
        // gọi fetch tìm email và pass
        fetch(`http://localhost:3000/regsiter?email=${email}&pass=${pass}`)
            .then((reponse) => {
                return reponse.json();
            })
            .then((json) => {
                if (json.length > 0) {  // nếu tồn tại
                    console.log(json[0].id, json[0].name, json[0].email, json[0].pass,json[0].tel,json[0].address);
                    let arr = [];
                    let list = [json[0].id, json[0].name, json[0].email, json[0].pass, json[0].tel, json[0].address];
                    arr.push(list);
                    // đưa vào session
                    sessionStorage.setItem("taikhoan", JSON.stringify(arr));
                    // chuyển qua trang chủ
                    window.location.href = "index.html";
                } else { //nếu ko tồn tại
                    console.log("email hoặc mật khẩu sai");
                }
            })
    })
}





// xóa session
function clearSession() {
    sessionStorage.removeItem("taikhoan");
}

handleLogin();