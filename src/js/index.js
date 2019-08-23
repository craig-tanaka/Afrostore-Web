/*jshint esversion: 6 */

const nav = document.querySelector('nav');
const cartBtnPaths = document.querySelectorAll('#cart-btn path');
const menuBtnPaths = document.querySelectorAll('#menu-btn line');
const searchBtnPaths = document.querySelectorAll('#search-btn path');
const productArr = document.querySelectorAll('.product');
const mainSec = document.querySelector('.main-sec');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');


let newProductsSnapShot = {}

window.addEventListener('scroll', (_event)=>{
    if ((document.body.scrollTop || document.documentElement.scrollTop) >= 12){
        nav.style.backgroundColor = "RGB(17, 17, 17)";
        cartBtnPaths.forEach((el) => {
            el.style.fill = "white";
        });
        menuBtnPaths.forEach((el)=>{
            el.style.stroke = 'white';
        });
        searchBtnPaths.forEach((el)=>{
            el.style.fill = 'white';
        });
        searchInput.style.color = 'white';
    }
    else{
        nav.style.backgroundColor = "white";
        cartBtnPaths.forEach((el) => {
            el.style.fill = "var(--blacks)";
        });
        menuBtnPaths.forEach((el)=>{
            el.style.stroke = 'var(--blacks)';
        });
        searchBtnPaths.forEach((el)=>{
            el.style.fill = 'var(--blacks)';
        });
        searchInput.style.color = 'var(--blacks)';
    }
},false);
productArr.forEach(el => {
    el.addEventListener('click', (__event)=>{
        alert('clicks');
    });
});
searchBtn.addEventListener('click', event=>{
    // if(searchInput)
})



function getRecommended() {
    db.collection("products").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            alert(`${doc.id} => ${doc.data().ProductName}`);
        });
    });  
}
function getNew() {
    db.collection("new").orderBy("UploadTimestamp", "desc").limit(6).get()
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
    for(var i = 0; i < productArr.length; i++){
        productArr[i].children[1].innerHTML = productsSnapShot.docs[i].data().ProductName;
        productArr[i].children[0].src = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/product-images%2F${productsSnapShot.docs[i].id}%2F00.jpeg?alt=media&token=58cdcea2-8f77-4ebf-bcf5-076320e01660`
        // alert()
    }
}


getNew();