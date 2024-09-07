
// // đây là phần để test
// let buildOrderTrData = (orderData, index) => {
//     if (orderData != null && typeof orderData === "object") {
//         const { id, customer_name, customer_address, customer_email, customer_phone_number, created_date, products } = orderData;

//         // Xây dựng HTML cho thông tin đơn hàng và sản phẩm
//         let productsInfo = '';
//         products.forEach((product, i) => {
//             productsInfo += `<div>Sản phẩm ${i + 1}: ID: ${product.product_id}, Số lượng: ${product.quantity}, Đơn giá: ${product.unit_price}</div>`;
//         });

//         return `
//             <div class="flex_tr box-${id}" >
//                 <div class="tr">
//                     <div class="th row_id_order" style="width: 100px;">${id}</div>
//                     <div class="th row_customer_name" style="width: 200px;">${customer_name}</div>
//                     <div class="th row_customer_address" style="width: 200px;">${customer_address}</div>
//                     <div class="th row_customer_email" style="width: 200px;">${customer_email}</div>
//                     <div class="th row_customer_phone_number" style="width: 150px;">${customer_phone_number}</div>
//                     <div class="th row_created_date" style="width: 150px;">${created_date}</div>
//                     <div class="th row_products" style="width: 600px;">${productsInfo}</div>
//                     <div class="th" style="width: 200px;">
//                         <button onclick="handleUpdateOrder(${id})" class="bnt_list btn_edit">Sửa</button>
//                         <button onclick="handleDeleteOrder(${id})" class="bnt_list1 btn_delete">Xóa</button>
//                     </div>
//                 </div> 
//             </div>
//         `;
//     }
// };

// // Render dữ liệu đơn hàng
// fetch('http://localhost:3000/orders')
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         let ordersData = '';
//         for (const key in json) {
//             if (Object.hasOwnProperty.call(json, key)) {
//                 const order = json[key];
//                 ordersData += buildOrderTrData(order, key);
//             }
//         }
//         document.getElementById("tbody-orders").innerHTML = ordersData;
//     });


// dữ liệu sẽ đc đổ vào form này
let buildOrderTrData = (oderData, index) => {
  if(oderData != null && typeof oderData === "object") {
      const { id, customer_idkh, created_date, products } = oderData;

      
      return ` <div class="tr_sp tr_donhang">
                    <div class="td id_oder" style="width: 150px;">${id}</div>
                    <div class="td" style="width: 300px;">${customer_idkh}</div>
                    <div class="td" style="width: 250px;">Sản Phẩm</div>
                    <div class="td" style="width: 100px;">${created_date}</div>
                    <div class="td" style="width: 300px;">
                        <button class="bnt_list1">Chi tiết</button>
                        <button class="bnt_list1 bnt_delOder">Xóa</button>
                    </div>
                </div>`;
  }
}

// render dữ liệu
fetch(`http://localhost:3000/orders`)
    .then((reponse) => { 
        return reponse.json();
    })
    .then((json)=> {
       let datas = "";
       for (const key in json) {
        if (Object.hasOwnProperty.call(json, key)) {
            const element = json[key];
            datas += buildOrderTrData(element,key)  
        }
       }
        document.getElementById("tbody_sp1").innerHTML = datas;
    })

// xóa đơn hàng
function delete_order() {
    document.addEventListener("click",(event)=>{
        if (event.target.matches(".bnt_delOder")) {
            let start = event.target;
            let boxOder = start.parentElement.parentElement;
            let id = boxOder.querySelector(".id_oder").textContent;
            
            fetch(`http://localhost:3000/orders/${id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            boxOder.remove();
        }
    })
}
delete_order();