const header = document.querySelector('header')
const cartBtnPaths = document.querySelectorAll('.cart-btn path')
const menuBtnPaths = document.querySelectorAll('.menu-btn path')

window.addEventListener('scroll', (_event)=>{
    if ((document.body.scrollTop || document.documentElement.scrollTop) >= 12){
        header.style.backgroundColor = "var(--blacks)"
        cartBtnPaths.forEach((el) => {
            el.style.fill = "white"
        })
        menuBtnPaths.forEach((el)=>{
            el.style.stroke = 'white'
        })
    }
    else{
        header.style.backgroundColor = "white"
        cartBtnPaths.forEach((el) => {
            el.style.fill = "var(--blacks)"
        })
        menuBtnPaths.forEach((el)=>{
            el.style.stroke = 'var(--blacks)'
        })
    }
},false)