//Showing Restaurant Form

function restaurantSignUpForm() {
    div = document.getElementById('main')
    div.innerHTML = `
    <div id="form" class="form">
        <h1>Restaurant <br> Sign Up</h1>
        <br><br>
        <div class="mb-3">
            <label class="form-label">Restaurant Name</label>
            <input type="text" class="form-control" id="restaurant" placeholder="Enter Your Restaurant Name">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter Your Email Address">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter Your Password">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Country</label>
            <input type="text" class="form-control" id="country" placeholder="Enter Your Country">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your City</label>
            <input type="text" class="form-control" id="city" placeholder="Enter Your City">
        </div>
        <br>
        <button type="button" class="btn-signup" onclick="restaurantSignUp()">Sign Up</button>
        <br><br>
        <button id="changeBtn" onclick="restaurantSignInForm()">Sign In Here</button>
    </div>
    `
}

function restaurantSignUp() {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    restaurant = document.getElementById('restaurant').value
    country = document.getElementById('country').value
    city = document.getElementById('city').value

    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            restaurantObj = {
                'email': email,
                'restaurant': restaurant,
                'country': country,
                'city': city
            }

            firebase.database().ref('Restaurants').child(user.uid).set(restaurantObj)
            restaurantSignInForm()
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

function restaurantSignInForm() {
    div = document.getElementById('main')
    div.innerHTML = `
    <div id="form" class="form">
        <h1>Restaurant <br> Sign In</h1>
        <br><br>
        <br>
        <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter Your Email Adress">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter Your Password">
        </div>
        <br>
        <button type="button" class="btn-signup" onclick="restaurantSignIn()">Sign In</button>
        <br><br>
        `
}

function restaurantSignIn() {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            firebase.database().ref('Restaurants').child(uid).on('value', (data) => {
                a = data.val()

                localStorage.setItem('email', a.email)
                localStorage.setItem('restaurant', a.restaurant)
                localStorage.setItem('city', a.city)
                localStorage.setItem('country', a.country)
                localStorage.setItem('uid', uid)
            })
            setTimeout(() => {
                window.location.href = './restaurant/restaurantHome.html'
            }, 3000)
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

//Showing Customer Form

function userSignUpForm() {
    div = document.getElementById('main')
    div.innerHTML = `
    <div id="form" class="form">
        <h1>Customer <br> Sign Up</h1>
        <br><br>
        <div class="mb-3">
            <label class="form-label">Customer Name</label>
            <input type="text" class="form-control" id="customer" placeholder="Enter Your Name">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter Your Email Adress">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter Your Password">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Phone Number</label>
            <input type="text" class="form-control" id="phone" placeholder="Enter Your Phone No">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Country</label>
            <input type="text" class="form-control" id="country" placeholder="Enter Your Country">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your City</label>
            <input type="text" class="form-control" id="city" placeholder="Enter Your City">
        </div>
        <br>
        <button type="button" class="btn-signup" onclick="customerSignUp()">Sign Up</button>
        <br><br>
        <button id="changeBtn" onclick="customerSignInForm()">Sign In Here</button>
    </div>
    `
}

function customerSignUp() {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    customer = document.getElementById('customer').value
    country = document.getElementById('country').value
    city = document.getElementById('city').value
    phone = document.getElementById('phone').value

    firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid
            customerObj = {
                'email': email,
                'customer': customer,
                'country': country,
                'city': city,
                'phone': phone
            }

            firebase.database().ref('Customers').child(user.uid).set(customerObj)
            customerSignInForm()
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
}


function customerSignInForm() {
    div = document.getElementById('main')
    div.innerHTML = `
    <div id="form" class="form">
        <h1>Customer <br> Sign In</h1>
        <br><br>
        <br>
        <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter Your Email Adress">
        </div>
        <br>
        <div class="mb-3">
            <label class="form-label">Enter Your Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter Your Password">
        </div>
        <br>
        <button type="button" class="btn-signup" onclick="customerSignIn()">Sign In</button>
        <br><br>
        `
}

function customerSignIn() {
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            uid = user.uid

            firebase.database().ref('Customers').child(uid).on('value', (data) => {
                a = data.val()
                localStorage.setItem('email', a.email)
                localStorage.setItem('customer', a.customer)
                localStorage.setItem('city', a.city)
                localStorage.setItem('country', a.country)
                localStorage.setItem('phone', a.phone)
                localStorage.setItem('uid', uid)
            })
            setTimeout(() => {
                window.location.href = './customer/customerHome.html'
            }, 3000)
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

// // //Checking Admin Credential

// // function adminCredentialCheck() {
// //     email = document.getElementById('email')
// //     password = document.getElementById('password')

// //     if (email.value === "admin" && password.value === "admin") {
// //         window.location.href = "./admin-home.html"
// //     } else {
// //         alert('Enter Correct Email and Password')
// //     }
// // }

// // //Sending User Credential To Local Storage

// // function userSignUp() {
// //     email = document.getElementById('email').value
// //     password = document.getElementById('password').value

// //     if (email.length >= 10 && password.length >= 6) {
// //         localStorage.setItem('userEmail', email)
// //         window.location.href = "./user-home.html"
// //     } else {
// //         alert('Email or Password Too Short')
// //     }
// // }

// //

// // quiz1 = [
// //     {
// //         question: "Who won 2014 FIFA Worlcup?",
// //         opt1: "Brazil",
// //         opt2: "Germany",
// //         opt3: "Argentina",
// //         opt4: "France"
// //     }, {
// //         question: "Who won 2018 FIFA Worlcup?",
// //         opt1: "Italy",
// //         opt2: "Brazil",
// //         opt3: "Germany",
// //         opt4: "France"
// //     }, {
// //         question: "Which player has won 3 Worldcups in his career?",
// //         opt1: "Pele",
// //         opt2: "Maradona",
// //         opt3: "Ronaldo",
// //         opt4: "Ronaldinho"
// //     }, {
// //         question: "Which player is known as 'El Pibe de Oro'?",
// //         opt1: "Ronaldinho",
// //         opt2: "Pele",
// //         opt3: "Maradona",
// //         opt4: "Ronaldo"
// //     }, {
// //         question: "Which player is known as 'El Pistolero'?",
// //         opt1: "Suarez",
// //         opt2: "Messi",
// //         opt3: "Ronaldo",
// //         opt4: "Maradona"
// //     }
// // ]

// // firebase.database().ref('Categories').child('Football').child('Quiz1').set(quiz1)
// // firebase.database().ref('Categories').child('Football').child('Quiz2').set(quiz1)
// // firebase.database().ref('Categories').child('Gaming').child('Quiz1').set(quiz1)


// // Admin Data 

// var fromFirebase;
// function receive(data) {
//     data.value
// }

// function adminHome() {
//     // b = firebase.database().ref('Categories').child('Football').child('Quiz1').
//     // a = firebase.database().ref('Categories').child('Football').child('Quiz1').child('0').child('opt1').on('value',(data)=> {
//     //     console.log(data.val())
//     // })

//     a = firebase.database().ref('Categories').orderByChild('a').on('value', (data) => {
//         console.log(data.val())
//         fromFirebase = new receive(data.val());
//     })
//     console.log(fromFirebase)
// }