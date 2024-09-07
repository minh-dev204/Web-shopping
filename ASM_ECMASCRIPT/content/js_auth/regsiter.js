function handleRegsiter() {
    //    b1.Lấy dữ liệu user nhập 
    let btn_register = document.querySelector(".btn_register");
    btn_register.addEventListener("click", async () => {
        let name = document.querySelector("input[name = nameRegister]").value;
        let email = document.querySelector("input[name = emailRegister]").value;
        let pass = document.querySelector("input[name = passRegister]").value;
        let tel = document.querySelector("input[name = telRegister]").value;
        let address = document.querySelector("input[name = addressRegister]").value;
        let data = { name, email, pass, tel,address };
        // console.log(data);

        let emailExists = await checkEmail(email);
        if (emailExists === true) {  //nếu email đẫ tồn tại thì ko cho đăng ký
            alert("email đã tồn tại")
            // cho mấy cái value = rỗng
            document.querySelector("input[name = nameRegister]").value = "";
            document.querySelector("input[name = emailRegister]").value = "";
            document.querySelector("input[name = passRegister]").value = "";
            document.querySelector("input[name = telRegister]").value = "";
            document.querySelector("input[name = addressRegister]").value = "";
        }
        else {  // nếu email chưa tồn tại thì đc đăng ký
            await fetch(`http://localhost:3000/regsiter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((reponse) => {
                    return reponse.json();
                })
                .then((json) => {
                    console.log(json);
                    // chuyển trang login
                    window.location.href = "dangnhap.html";
                })
        }
    })
}

handleRegsiter();


// check email 
async function checkEmail(email) {
    let response = await fetch(`http://localhost:3000/regsiter?email=${email}`);
    let json = await response.json();
    if (json.length > 0) {
        // nếu email đã có trong jsonsver thì trả về true
        return true;
        // console.log("email tồn tại");
    } else {
        // nếu email chưa có thì trả về false
        return false;
        // console.log("email chưa tồn tại");
    }
}


// checkEmail("mbui683@gmail.com");