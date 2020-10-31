// GLOBAL
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');
// DIVS
var womenDIV = document.getElementById("womenDIV");
var menDIV = document.getElementById("menDIV");
var kidDIV = document.getElementById("kidDIV");
//INFORMATION
var WOMEN = [
    { name: 'Bob Marley', price: 1 },
    { name: 'Barbara Kruger', price: 1 },
    { name: 'Tupac Shakur', price: 1 },
    { name: 'Chanel Karl', price: 1 },
    { name: 'Black Eyed Peas', price: 1 },
    { name: 'Gucci ', price: 1 }
];
var MEN = [
    { name: 'Rolling Stones', price: 10 },
    { name: 'Star Wars', price: 11 },
    { name: 'Bob Marley', price: 12 }
];
var KID = [
    { name: 'Fraggle Rock', price: 11 },
    { name: 'Bob Marley', price: 12 },
    { name: 'Phineas & Ferb', price: 15 }
];
//HTML
function HTMLwomenProduct(con) {
    let URL = `../img/womens/women${con}.jpeg`;
    let btn = `btnwomen${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${WOMEN[con-1].name}</p>
                    <p class="card-text">Price: ${WOMEN[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${WOMEN[con-1].name}','${WOMEN[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${WOMEN[con-1].name}','${WOMEN[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free shipping </small>
                    </div>
                </div>
            </div>
        </div>
    `
}

function HTMLmenProduct(con) {
    let URL = `img/men/men${con}.jpeg`;
    let btn = `btnMen${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${MEN[con-1].name}</p>
                    <p class="card-text">Price: ${MEN[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${MEN[con-1].name}','${MEN[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="/cart" style="color:inherit;">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${MEN[con-1].name}','${MEN[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free shipping </small>
                    </div>
                </div>
            </div>
        </div>
    `
}

function HTMLkidProduct(con) {
    let URL = `img/kids/kid${con}.jpeg`;
    let btn = `btnKid${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${KID[con-1].name}</p>
                    <p class="card-text">Price: ${KID[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${KID[con-1].name}','${KID[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="/cart" style="color:inherit;">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${KID[con-1].name}','${KID[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free shipping </small>
                    </div>
                </div>
            </div>
        </div>
    `
}
//ANIMATION 
function animation() {
    const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
    });
    toast({
        type: 'success',
        title: 'Added to shopping cart'
    });
}
// CART FUNCTIONS
function cart(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    animation();
}

function cart2(name, price, url, con, btncart) {
    var item = {
        name: name,
        price: price,
        url: url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
}


(() => {
    for (let index = 1; index <= 6; index++) {
        womenDIV.innerHTML += `${HTMLwomenProduct(index)}`;
    }
    for (let index = 1; index <= 3; index++) {
        menDIV.innerHTML += `${HTMLmenProduct(index)}`;
        kidDIV.innerHTML += `${HTMLkidProduct(index)}`;
    }
    if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `[${products.length}]`;
    }
})();