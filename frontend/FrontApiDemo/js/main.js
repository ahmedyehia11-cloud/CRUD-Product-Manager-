let products = []
getData()
function getData() {
    fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.message == 'done') {
                products = responseData.data
                showData()
            }
            console.log(products)

        });

}


function showData() {
    var cartona = ``;

    for (let index = 0; index < products.length; index++) {
        cartona += `<tr>
                           <td>${products[index].name}</td>
                           <td>${products[index].price}</td>
                           <td>${products[index].description}</td>
                           <td>
                            <button onclick='deleteProduct(${products[index].id})' class="btn  btn-danger">delete</button>
                            <button class="btn btn-success">update</button>
                           </td>
                           
                      </tr>`;
    }

    document.getElementById("tbody").innerHTML = cartona;

}






function getInputValue() {
    let productName = document.getElementById('productName').value
    let productPrice = document.getElementById('productPrice').value
    let productDesc = document.getElementById('productDesc').value

    let productObj = {
        name: productName,
        price: productPrice,
        description: productDesc
    }

    ApiCrud('POST', productObj)
}




// 
function ApiCrud(endPoint, body) {
    fetch("http://localhost:3000/products", {

        // Adding method type
        method: endPoint,

        // Adding body or contents to send
        body: JSON.stringify(body),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message == "done") {
                getData()
            }
        });
}
function deleteProduct(id) {
    ApiCrud('DELETE', { id })

}
