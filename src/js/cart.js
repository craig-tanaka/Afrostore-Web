let cartTotal = 0;
document.querySelector('.nav-btn').addEventListener('click', event => {
    // window.open(`./cart.html?c=cartId`, "_self");
    if(confirm('Save changes made to your cart')){
        if(firebase.auth().currentUser === null){
            sessionStorage.setItem('cartItems', JSON.stringify(cartIDs));
        }else{
            // db.collection('carts').doc(firebase.auth().currentUser.uid).set()
        }
    }
    // TODO check if previous page is from this sitte if not go to homepage instead
    window.history.back();

    // TODO Ask user to save any changes to cart
})

function onUserLoaded(){
    cartIDs.forEach((el, index)=>{
        db.collection('products').doc(el).get()
            .then(querySnapshot => {
                renderCartItem(querySnapshot.data(), index);
            })
    })
}
// TODO add query event listeners

document.querySelector('.cart-items').addEventListener('click', event => {
    if (!(event.target.className === "cart-item-btn"))
        return;
    else if (event.target.id === "removeFromCart-btn")
        removeFromCart(event);
    else if (event.target.id === "addBack2Cart-btn")
        addBack2Cart(event);
});
document.querySelector('#cart-submit-btn').addEventListener('click', event => {
    // alert('')
    if (firebase.auth().currentUser === null) {
        // first have user create account

        const message = 'You must be logged in to make an order.\nOpen Register and Sign in page?'

        if (confirm(message)) {
            window.sessionStorage.setItem('prevSignUrl', window.location.href);
            window.open('./signin.html', '_self');
        } else {
            return;
        }
    }
});

function renderCartItem(product, index) {
    let cartItemHtml =
        `<div class="cart-item" index=" ${index} ">
            <img src="https://firebasestorage.googleapis.com/v0/b/${bucket}/o/product-images%2F${cartIDs[index]}%2F00.jpg?alt=media" alt="${product.ProductName}" class="cart-product-img">
            <h4 class="cart-product-name">
                ${product.ProductName}
            </h4>
            <div class="cart-product-price-col">
                <div class="cart-item-btns">
                    <button id="addBack2Cart-btn" class="cart-item-btn" disabled>+</button>
                    <button id="removeFromCart-btn" class="cart-item-btn">-</button>
                </div>
                <h5 class="cart-product-price">$${product.Price}</h5>
            </div>
        </div>`

    cartTotal = Number(cartTotal) + Number(product.Price);
    if (index === 0) {
        document.querySelector('.cart-items').innerHTML = cartItemHtml;
        document.querySelector('.cart-total-label').classList.toggle('hidden');
        document.querySelector('.cart-btn-row').classList.toggle('hidden');
    } else
        document.querySelector('.cart-items').innerHTML += cartItemHtml;
    document.querySelector('#cart-total').innerHTML = `$${cartTotal}`;
}

function removeFromCart(event) {
    const cartItem = event.target.parentElement.parentElement.parentElement;

    cartItem.style.opacity = '0.6';
    event.target.previousElementSibling.disabled = false; //enables addBack2Cart btn for element
    event.target.disabled = true; //disables remove from cart btn

    const itemPrice = Number(event.target.parentElement.nextElementSibling.innerHTML.substring(1));
    cartTotal = cartTotal - itemPrice;
    document.querySelector('#cart-total').innerHTML = `$${cartTotal}`;

    cartIDs.splice(cartItem.getAttribute('index'), 1);

    console.log(`Deleted item ${cartIDs[cartItem.getAttribute('index')]}, Remaining :`)
    cartIDs.forEach(el => {
        console.log(el);
    })
}

function addBack2Cart(event) {
    const cartItem = event.target.parentElement.parentElement.parentElement;
    const itemIndex = Number(cartItem.getAttribute('index'));

    cartItem.style.opacity = '1';
    event.target.nextElementSibling.disabled = false; //enables remove from cart btn  
    event.target.disabled = true; //disables addBack2Cart btn for element

    const itemPrice = Number(event.target.parentElement.nextElementSibling.innerHTML.substring(1));
    cartTotal = cartTotal + itemPrice;
    document.querySelector('#cart-total').innerHTML = `$${cartTotal}`;

    const sessionCart = JSON.parse(sessionStorage.getItem('cartItems'));
    cartIDs.push(sessionCart[itemIndex]);

    console.log(`Added item Remaining :`)
    cartIDs.forEach(el => {
        console.log(el)
    })
}