/*jshint esversion: 6 */

const nav = document.querySelector('nav');
const productArr = document.querySelectorAll('.product');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');


let newProductsSnapShot = {}
let currentProductSnapShot = []
let cartProducts = [];
let cartIDs = [];
let isSidebarCollapsed = true;

function changeCartIcon(){
    document.querySelector('#cart-btn').innerHTML = `
    <path id="svg_7"
        d="m162.69232,224.75c0,-42.49043 34.41725,-76.90768 76.90768,-76.90768c42.49044,0 76.90769,34.41725 76.90769,76.90768c0,42.49044 -34.41725,76.90769 -76.90769,76.90769c-42.49043,0 -76.90768,-34.41725 -76.90768,-76.90769z"
        stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null"
        stroke="#000000" fill="#ff0000" />
    <path id="svg_8"
        d="m48.69232,157.75c0,-42.49043 34.41725,-76.90768 76.90768,-76.90768c42.49044,0 76.90769,34.41725 76.90769,76.90768c0,42.49044 -34.41725,76.90769 -76.90769,76.90769c-42.49043,0 -76.90768,-34.41725 -76.90768,-76.90769z"
        stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null"
        stroke="#000000" fill="#00ffff" />
    <path id="svg_4"
        d="m126.69232,214.75c0,-42.49043 34.41725,-76.90768 76.90768,-76.90768c42.49043,0 76.90768,34.41725 76.90768,76.90768c0,42.49043 -34.41725,76.90768 -76.90768,76.90768c-42.49043,0 -76.90768,-34.41725 -76.90768,-76.90768z"
        stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null"
        stroke="#000000" fill="#0000ff" />
    <path id="svg_3"
        d="m43.69232,214.75c0,-42.49043 34.41725,-76.90768 76.90768,-76.90768c42.49044,0 76.90769,34.41725 76.90769,76.90768c0,42.49044 -34.41725,76.90769 -76.90769,76.90769c-42.49043,0 -76.90768,-34.41725 -76.90768,-76.90769z"
        stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null"
        stroke="#000000" fill="#ff7f00" />
    <path id="svg_6"
        d="m126.69232,214.75c0,-42.49043 34.41725,-76.90768 76.90768,-76.90768c42.49044,0 76.90769,34.41725 76.90769,76.90768c0,42.49044 -34.41725,76.90769 -76.90769,76.90769c-42.49043,0 -76.90768,-34.41725 -76.90768,-76.90769z"
        stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null"
        stroke="#000000" fill="#0000ff" />
    <path id="svg_5"
        d="m145.69232,151.75c0,-42.49043 34.41725,-76.90768 76.90768,-76.90768c42.49044,0 76.90769,34.41725 76.90769,76.90768c0,42.49044 -34.41725,76.90769 -76.90769,76.90769c-42.49043,0 -76.90768,-34.41725 -76.90768,-76.90769z"
        stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null"
        stroke="#000000" fill="#7f00ff" />
    <path fill="black"
        d="m359.8,150.3c-5.3,-9.7 -10.7,-9.6 -20.9,-9.6c-21.8,0 -43.6,-0.5 -65.4,-0.3c-23.2,0.2 -46.5,0.1 -69.7,0.1l-169,0c-6.1,0 -14.3,-0.9 -21.3,0.5c-4.7,1 -8.8,3.1 -11.3,7.4c-2.1,3.7 -2.5,8.2 -2.2,12.4c0.4,5.9 2,11.9 6.1,16.1c2.5,2.7 5.9,4.4 9.6,4.7c2.3,0.1 7.5,-2.6 8,0.7c2.2,14.1 16.1,104.5 20.7,120.2c5,17 14,17 14,17l241,0c16,-6 16,-16 16,-16c5.8,-33.8 11.6,-67.7 17.5,-101.5c0.9,-5 0.1,-9.3 2.8,-16.2c2.7,-6.9 18.7,-6 24,-12.5s3.9,-16 0.1,-23zm-287.7,122.7l-8.6,-82c14,-19 26,0 26,0s5.4,52 8.6,82c-10.5,26.5 -26,0 -26,0zm86.8,0c-13.3,26.5 -26,0 -26,0l0,-82c16,-19 26,0 26,0l0,82zm68,0c-13.3,26.5 -26,0 -26,0l0,-82c16,-19 26,0 26,0l0,82zm59.9,0c-16,26.5 -26,0 -26,0l8.6,-82c18,-19 26,0 26,0s-5.4,52 -8.6,82z"
        id="svg_1" />
    <path fill="black"
        d="m57.41903,136c4.5,0 8.4,-3.1 9.4,-7.4l16.9,-70.1c0.3,-1.1 0.7,-2.2 1.4,-3.2c2.4,-3.7 5.6,-6.8 9.4,-9.1c1.4,-0.8 3.1,-1.2 4.7,-1.2l30.1,0c3.6,0 6.9,2 8.6,5.2c1.1,2 2.8,3.6 4.8,4.7c1.4,0.8 3,1.2 4.6,1.1l70.9,0s3.5,0 7.6,-6.6c1.8,-2.8 4.8,-4.5 8.1,-4.4l29.4,0c1.4,0 2.9,0.3 4.1,0.9c3.3,1.6 8.4,4.8 12.7,14.1c0.5,1.1 2,3.4 2,4.6c0.7,13.9 9.9,49.1 14,64.2c1.1,4.2 5,7.2 9.3,7.1l0.4,0c5.3,0 9.7,-4.3 9.7,-9.7c0,-0.8 -0.1,-1.5 -0.3,-2.2l-16.1,-67.7l-0.3,-0.9a51.19,51.19 0 0 0 -37.9,-32.3c-0.7,-0.1 -1.3,-0.2 -2,-0.2l-28.3,0c-3.5,0 -6.8,-2 -8.4,-5.1c-0.6,-1 -1.2,-2 -1.9,-3c-1.8,-2.4 -4.7,-3.9 -7.7,-3.9l-63.6,0c-2.2,0 -4.4,0.8 -6.1,2.1c-1.8,1.4 -3.3,3.1 -4.5,5c-1.6,2.9 -4.7,4.8 -8.1,4.8l-31.3,0c-1.3,0 -2.6,0.3 -3.8,0.8c-6.6,3 -27.9,13.4 -32.2,29.4c-5.2,14 -12,52.5 -15.2,71.7c-0.9,5.3 2.7,10.3 7.9,11.1c0.7,0.2 1.2,0.2 1.7,0.2z"
        id="svg_2" />`
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection('carts').doc(firebase. auth().currentUser.uid).get()
        .then(querySnapshot => {
            cartIDs = querySnapshot.data().Products;
            if(cartIDs.length > 0) changeCartIcon();
        })
    } else {
        if(confirm('You are not logged in,\nDo you wanna sign in?')){
            window.open(`./signin.html`,'_self');
        }
        if(sessionStorage.getItem('cartItems') === null){
            sessionStorage.setItem('cartItems', JSON.stringify([]));
        }
        cartIDs = JSON.parse(sessionStorage.getItem('cartItems'));
        if(cartIDs.length > 0) changeCartIcon();
    }
  }) 

// sidebar
document.querySelector('#menu-btn').addEventListener('click', toggleSidebar);
document.querySelector('#sidebar-overlay').addEventListener('click', toggleSidebar);
document.querySelector('#signin-btn').addEventListener('click', event => {
    window.sessionStorage.setItem('prevSignUrl', window.location.href);
    window.open('./signin.html', '_self');
});

// Search
searchBtn.click = event => {
    if (searchInput.value.length == 0) {
        searchInput.focus();
        searchInput.style.outline = "1px solid rgba(168, 41, 41, 0.578)";
    } else {
        let search = searchInput.value;
        window.open(`./Search.html?s=${search}`, "_self")
    }
}
searchBtn.addEventListener('click', searchBtn.click)
searchInput.oninput = event => {
    if (searchInput.style.outline !== '0px' && searchInput.value.length > 0)
        searchInput.style.outline = '0px';
}
searchInput.addEventListener('keyup', event => {
    if (event.key === "Enter")
        document.querySelector('#search-btn').click();
})

// Cart
document.querySelector('#cart-btn').addEventListener('click', event => {
    window.open(`./cart.html?`, "_self");
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
        .then(querySnapshot => {
            newProductsSnapShot = querySnapshot;

            updateProducts(newProductsSnapShot)

            // querySnapshot.forEach((doc) => {
            //     alert(`${doc.id} => ${doc.data().ProductName}`);
            // });
        })
}

function updateProducts(productsSnapShot) {
    currentProductSnapShot = productsSnapShot;
    for (var i = 0; i < productArr.length; i++) {
        productArr[i].index = i;
        productArr[i].children[1].innerHTML = productsSnapShot.docs[i].data().ProductName;
        productArr[i].children[0].src = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/product-images%2F${productsSnapShot.docs[i].id}%2F00.jpg?alt=media`
        // productArr[i].children[0].src = `https://firebasestorage.googleapis.com/v0/b/afrostore-141ed.appspot.com/o/product-images%2FIa7JpiiYQ8NihWd01BY5%2F00.jpg?alt=media`
        productArr[i].addEventListener('click', event => {
            window.open(`./Product.html?p=${currentProductSnapShot.docs[event.currentTarget.index].id}`, "_self");
        });
    }
}

function toggleSidebar() {
    if (isSidebarCollapsed) {
        document.querySelector('#sidebar-overlay').style.width = '100%';
        document.querySelector('#sidebar').style.width = '50%';
        document.querySelectorAll('#sidebar button').forEach(el => {
            el.style.display = 'initial';
        });
    } else {
        document.querySelector('#sidebar-overlay').style.width = '0';
        document.querySelector('#sidebar').style.width = '0';
        document.querySelectorAll('#sidebar button').forEach(el => {
            el.style.display = 'none';
        });
    }

    isSidebarCollapsed = !(isSidebarCollapsed);
}


getNew();