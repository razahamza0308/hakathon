//SignOut

function signOut() {
    firebase.auth().signOut()
    localStorage.clear()
    location.reload()
}

//Restaurant Name on Nav 

function restaurantOnNav() {
    if (localStorage.getItem('restaurant') && localStorage.getItem('uid')) {
        let a = document.getElementById('name')
        let b = localStorage.getItem('restaurant')
        a.innerText = b
    } else {
        window.location.href = "./../index.html"
    }
}

//Sending Dish to Firebase 

async function addDish() {
    dishName = document.getElementById('dishName').value
    dishPrice = document.getElementById('dishPrice').value
    deliveryType = document.getElementById('deliveryType').value
    dishImage = document.getElementById('dishImage').files[0]
    category = document.getElementById('categories').value

    x = firebase.storage().ref().child("images/" + dishName)
    await x.put(dishImage)
    let url = await x.getDownloadURL()

    obj = {
        'dishName': dishName,
        'dishPrice': dishPrice,
        'deliveryType': deliveryType,
        'category': category,
        'dishImage': url
    }
    uid = localStorage.getItem('uid')
    firebase.database().ref('Restaurants').child(uid).child('Dishes').push(obj)
    setTimeout(() => {
        window.location.href = './restaurantHome.html'
    }, 1000)
}

//Getting Dishes From Firebase

function dishes() {
    if (localStorage.getItem('uid')) {
        uid = localStorage.getItem('uid')
        dish = firebase.database().ref('Restaurants').child(uid).child('Dishes').on('value', (data) => {
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
            
                <button onclick='deleteItem("${key}")' class = "delBtn"><img src="./../images/delete.png" id="del"></button>
            </div>
        </div>`
            }
        })
    }
    restaurantOnNav()
}

//Deleting Dish 

function deleteItem(a) {
    let uid = localStorage.getItem('uid')
    firebase.database().ref('Restaurants').child(uid).child('Dishes').child(a).remove()
    location.reload()
}

//Showing Pending Orders

function placedOrders() {
    document.getElementById('orderList').innerHTML = `
    <tr>
                <th>Dish Name</th>
                <th>Dish Price</th>
                <th>Delivery Type</th>
                <th>Customer Name</th>
                <th>Order Status</th>
                <th>Cancel Order</th>
            </tr>   `
    if (localStorage.getItem('uid')) {
        resUid = localStorage.getItem('uid')
        firebase.database().ref('Orders').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                if (x.resUid === resUid && x.status === 'Pending') {
                    document.getElementById('orderList').innerHTML += `
                        <tr>
                            <th>${x.dishName}</th>
                            <th>${x.dishPrice}</th>
                            <th>${x.deliveryType}</th>
                            <th>${x.customerName}</th>
                            <th>${x.status}<button class="btn2" onclick="acceptOrder('${key}')">Accept</button></th>
                            <th><button class="btn2" onclick="rejectOrder('${key}')">Reject</button></th>
                        </tr>`
                }
            }
        })
    }
    restaurantOnNav()
}

//Accepting Order

function acceptOrder(a) {
    x = firebase.database().ref('Orders').child(a).child('status').set('Accepted')
    location.reload()
}

//Rejecting Order

function rejectOrder(a) {
    x = firebase.database().ref('Orders').child(a).child('status').set('Rejected')
    location.reload()
}

//Showing Accepted Orders

function acceptedOrders() {
    document.getElementById('orderList').innerHTML = `
    <tr>
                <th>Dish Name</th>
                <th>Dish Price</th>
                <th>Delivery Type</th>
                <th>Customer Name</th>
                <th>Order Status</th>
                <th>Cancel Order</th>
            </tr>   `
    if (localStorage.getItem('uid')) {
        resUid = localStorage.getItem('uid')
        firebase.database().ref('Orders').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                if (x.resUid === resUid && x.status === 'Accepted') {
                    document.getElementById('orderList').innerHTML += `
                        <tr>
                            <th>${x.dishName}</th>
                            <th>${x.dishPrice}</th>
                            <th>${x.deliveryType}</th>
                            <th>${x.customerName}</th>
                            <th>${x.status}<button class="btn2" onclick="deliverOrder('${key}')">Deliver</button></th>
                            <th><button class="btn2" onclick="rejectOrder('${key}')">Reject</button></th>
                        </tr>`
                }
            }
        })
    }
    restaurantOnNav()
}

//Deliver Order

function deliverOrder(a) {
    x = firebase.database().ref('Orders').child(a).child('status').set('Delivered')
    location.reload()
}

//Showing Delivered Orders

function deliveredOrders() {
    document.getElementById('orderList').innerHTML = `
    <tr>
                <th>Dish Name</th>
                <th>Dish Price</th>
                <th>Delivery Type</th>
                <th>Customer Name</th>
                <th>Order Status</th>
                <th>Cancel Order</th>
            </tr>   `
    if (localStorage.getItem('uid')) {
        resUid = localStorage.getItem('uid')
        firebase.database().ref('Orders').on('value', (data) => {
            a = data.val()
            for (var key in a) {
                x = a[key]
                if (x.resUid === resUid && x.status === 'Delivered') {
                    document.getElementById('orderList').innerHTML += `
                        <tr>
                            <th>${x.dishName}</th>
                            <th>${x.dishPrice}</th>
                            <th>${x.deliveryType}</th>
                            <th>${x.customerName}</th>
                            <th>${x.status}</th>
                            <th>Order cannot be cancelled</th>
                        </tr>`
                }
            }
        })
    }
    restaurantOnNav()
}