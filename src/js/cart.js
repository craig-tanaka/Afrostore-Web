document.querySelector('.nav-btn').addEventListener('click', event => {
    // window.open(`./cart.html?c=cartId`, "_self");
    window.history.back();
})

let cartIDs = JSON.parse(sessionStorage.getItem('cartItems'));
let cartTotal = 0;


cartIDs.forEach( (el , index)  => {
    console.log(el);
    db.collection('products').doc(el)
        .get()
        .then(querySnapshot => {
            let cartItemHtml = 
                `<div class="cart-item">
                <img src="https://firebasestorage.googleapis.com/v0/b/${bucket}/o/product-images%2F${el}%2F00.jpeg?alt=media&token=58cdcea2-8f77-4ebf-bcf5-076320e01660" alt="airpods" class="cart-product-img">
                <h4 class="cart-product-name">
                    ${querySnapshot.data().ProductName}
                </h4>
                <div class="cart-product-price-col">
                    <div class="cart-item-btns">
                        <button class=" cart-item-btn">+</button>
                        <button class=" cart-item-btn">-</button>
                    </div>
                    <h5 class="cart-product-price">$${querySnapshot.data().Price}</h5>
                </div>
            </div>`

            cartTotal = Number(cartTotal) + Number(querySnapshot.data().Price);
            if (index === 0){
                document.querySelector('.cart-items').innerHTML = cartItemHtml;
                document.querySelector('.cart-total-label').classList.toggle('hidden');
                document.querySelector('.cart-btn-row').classList.toggle('hidden');
            }
            else
                document.querySelector('.cart-items').innerHTML += cartItemHtml;
            document.querySelector('#cart-total').innerHTML = `$${cartTotal}`
        })
});

cartIDs.forEach( (el , index) => {

} )