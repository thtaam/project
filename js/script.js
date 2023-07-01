/* slider */
const imgPosition = document.querySelectorAll(".aspect-ratio-169 img");
const imgContainer = document.querySelector(".aspect-ratio-169");
const dotItem = document.querySelectorAll(".dot")
let imgNumber = imgPosition.length
let index = 0;
imgPosition.forEach(function (image, index) {
    image.style.left = index * 100 + "%";
    dotItem[index].addEventListener("click", function () {
        slider(index);
    })
});

function imgSlide() {
    index++;
    if (index >= imgNumber) { index = 0; }
    slider(index)
}

function slider(index) {
    imgContainer.style.left = "-" + index * 100 + "%";
    const dotActive = document.querySelector('.active2');
    dotActive.classList.remove("active2");
    dotItem[index].classList.add("active2");
}
setInterval(imgSlide, 4000)

/* mobile */
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

// Cart term
let cartIcon = document.querySelector('.cart-icon');
let cart = document.querySelector('#cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active1");
};

closeCart.onclick = () => {
    cart.classList.remove("active1");
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    //remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

//  buy button
function buyButtonClicked() {

}

//remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updateTotal();
}

// quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
}
// add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    var productImg = shopProducts.querySelector("img").src;
    var productName = shopProducts.querySelector("h5").innerText;
    var productPrice = shopProducts.querySelector("h4").innerText;
    addProductToCart(productImg, productName, productPrice);
    updateTotal();
}

function addProductToCart(productImg, productName, productPrice) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];

    var cartItemsNames = cartItems.getElementsByClassName('cart-pro-title');

    var quantity = cartItems.getElementsByTagName('input')[0]?.value
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == productName) {
            // alert("You have already add this item to cart");
            // todo : quantity ++
            cartItems.getElementsByTagName('input')[0].value =  Number(quantity) + 1  
            return;
        }
    }


    var cartBoxContent = `
    <img class="cart-img" src="${productImg}" alt="">
    <div class="detail-box">
        <div class="cart-pro-title">${productName}</div>
        <div class="cart-price">${productPrice}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <i class="fa fa-trash cart-remove" aria-hidden="true"></i>
`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}
// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        // if price contain some cents
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}
// Cart
// const btn = document.querySelectorAll(".pro-container a");

// btn.forEach(function (button,index){
//     button.addEventListener("click",function(event){
//         var btnItem = event.target;
//         var product = btnItem.parentElement.parentElement;
//         var productImg = product.querySelector("img").src;
//         var productName = product.querySelector("h5").innerText;
//         var productPrice = product.querySelector("h4").innerText;
//     })
// })

// function addCart(productImg,productName,productPrice) {
//     var addtr = document.createElement("tr");
//     var trcontent = productPrice
// }
