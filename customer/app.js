//SignOut

function signOut() {
    firebase.auth().signOut()
    localStorage.clear()
    location.reload()
}

//Customer on NavBar

function customerOnNav() {
    if (localStorage.getItem('customer') && localStorage.getItem('uid')) {
        let a = document.getElementById('name')
        let b = localStorage.getItem('customer')
        a.innerText = b
    } else {
        window.location.href = "./../index.html"
    }
}

//Getting Restaurants Name

function restaurants() {
    if (localStorage.getItem('uid')) {
        rest = firebase.database().ref('Restaurants').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                document.getElementById('cards').innerHTML += `
               <div class="card cardRes" style="width: 18rem;">
            <img src="https://bonhappetee.com/blog/wp-content/uploads/2016/02/fast-food-mix.jpg" class="card-img-top" alt="..." id="foodImg">
        <div class="card-body">
            <h2 class="card-title" id="resName">${x.restaurant}</h2>
            <h4 class="card-text">Location : <span id="resLocation">${x.city} , ${x.country}</span></h4>
            <button class="btn btn-primary" onclick='restaurantItems("${key}")'>See What is Available</button>
        </div>`
            }
        })
    }
    customerOnNav()
}

function restaurantItems(resUid) {
    document.getElementById('cards').innerHTML = " "
    dish = firebase.database().ref('Restaurants').child(resUid).child('Dishes').on('value', (data) => {
        a = data.val()
        for (var key in a) {
            x = a[key]
            document.getElementById('cards').innerHTML += `
                <div class="card" style="width: 18rem;">
            <img src= "${x.dishImage}" class="card-img-top"alt="..." id="foodImg">
            <div class="card-body">
                <h2 class="card-title" id="foodName">${x.dishName}</h2>
                <h4 class="card-text">Price : <span id="foodPrice">${x.dishPrice}</span></h4>
                <h4 class="card-text">Delivery : <span id="foodDelivery">${x.deliveryType}</span></h4>
                <button onclick='placeOrder("${resUid}","${key}")' class='btn'>Order Now</button>
            </div>
        </div>`
        }
    })
}

//Placing Order 

function placeOrder(resUid, dishUid) {
    userUid = localStorage.getItem('uid')
    customerName = localStorage.getItem('customer')
    firebase.database().ref('Restaurants').child(resUid).child('Dishes').child(dishUid).on('value', (data) => {
        order = data.val()
        order.status = 'Pending'
        order.resUid = resUid
        order.customerName = customerName
        order.cutomerUid = userUid
        firebase.database().ref('Orders').push(order)
    })
    alert('Order Placed')
}

//Showing Cart

function cart() {
    document.getElementById('orderList').innerHTML = `
    <tr>
        <th>Dish Name</th>
        <th>Dish Price</th>
        <th>Delivery Type</th>
        <th>Order Status</th>
        <th>Cancel Order</th>
    </tr>`
    if (localStorage.getItem('uid')) {
        userUid = localStorage.getItem('uid')
        firebase.database().ref('Orders').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                if (x.status === 'Delivered') {
                    document.getElementById('orderList').innerHTML += `
                <tr>
                    <td>${x.dishName}</td>
                    <td>${x.dishPrice}</td>
                    <td>${x.deliveryType}</td>
                    <td>${x.status}</td>
                    <td>Delivered Order cannot be cancelled</td>
                </tr>`
                }
                else {
                    document.getElementById('orderList').innerHTML += `
                    <tr>
                        <td>${x.dishName}</td>
                        <td>${x.dishPrice}</td>
                        <td>${x.deliveryType}</td>
                        <td>${x.status}</td>
                        <td><button id="cancel" onclick="cancelOrder('${key}')">Cancel Order</button></td>
                    </tr>`
                }
            }
        })
    }
    customerOnNav()
}

//Cancel Order

function cancelOrder(a) {
    userUid = localStorage.getItem('uid')
    firebase.database().ref('Orders').child(a).remove()
    location.reload()
}