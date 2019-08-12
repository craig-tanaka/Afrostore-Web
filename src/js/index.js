/*jshint esversion: 6 */

const nav = document.querySelector('nav');
const cartBtnPaths = document.querySelectorAll('.cart-btn path');
const menuBtnPaths = document.querySelectorAll('.menu-btn path');
const productArr = document.querySelectorAll('.product');

let newProductsSnapShot = {}
const db = firebase.firestore();
const storage = firebase.storage();
const bucket = storage.bucket_.bucket;

window.addEventListener('scroll', (_event)=>{
    if ((document.body.scrollTop || document.documentElement.scrollTop) >= 12){
        nav.style.backgroundColor = "var(--blacks)";
        cartBtnPaths.forEach((el) => {
            el.style.fill = "white";
        });
        menuBtnPaths.forEach((el)=>{
            el.style.stroke = 'white';
        });
    }
    else{
        nav.style.backgroundColor = "white";
        cartBtnPaths.forEach((el) => {
            el.style.fill = "var(--blacks)";
        });
        menuBtnPaths.forEach((el)=>{
            el.style.stroke = 'var(--blacks)';
        });
    }
},false);
productArr.forEach(el => {
    el.addEventListener('click', (__event)=>{
        alert('Santoryou has');
    });
});



function getRecommended() {
    db.collection("products").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            alert(`${doc.id} => ${doc.data().ProductName}`);
        });
    });  
}
function getNew() {
    db.collection("new").get()
        .then(querySnapshot=>{
            alert('Logging products ...')
            newProductsSnapShot = querySnapshot;

            updateProducts(newProductsSnapShot)

            // querySnapshot.forEach((doc) => {
            //     alert(`${doc.id} => ${doc.data().ProductName}`);
            // });
        })
}
function updateProducts(productsSnapShot) {
    for(var i = 0; i < 3; i++){
        productArr[i].children[1].innerHTML = productsSnapShot.docs[i].data().ProductName;
        productArr[i].children[0].src = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/product-images%2F{productsSnapShot.docs[i].id}%2F00.jpeg?alt=media&token=58cdcea2-8f77-4ebf-bcf5-076320e01660`
        // alert()
    }
}


getNew();