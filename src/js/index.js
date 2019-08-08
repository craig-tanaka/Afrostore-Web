/*jshint esversion: 6 */

const nav = document.querySelector('nav');
const cartBtnPaths = document.querySelectorAll('.cart-btn path');
const menuBtnPaths = document.querySelectorAll('.menu-btn path');
const productArr = document.querySelectorAll('.product');

const db = firebase.firestore();

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


function setProducts(params) {
    
}

function getRecommended() {

    db.collection("products").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            alert(`${doc.id} => ${doc.data().ProductName}`);
        });
    });
    
}
