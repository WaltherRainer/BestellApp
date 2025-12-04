
function showHamMenu() {
    const offScreenMenu = document.querySelector(".off_screen_menu");
    const menuImgOpac = document.querySelector(".box_item");
    const menuCardOpac = document.querySelector(".menu_card");
    const footerOpac = document.querySelector(".footer")
    offScreenMenu.classList.toggle("active");
    menuImgOpac.classList.toggle("inactive");
    menuCardOpac.classList.toggle("inactive");
    footerOpac.classList.toggle("active");
};

function showHamMenuWhenShopCartOpen() {
    showShopCart();
    showHamMenu();
}

function showShopCart() {
    const offScreenMenu = document.querySelector(".resp_shop_cart");
    offScreenMenu.classList.toggle("active");
}

function showHamMenuImpr() {
    const offScreenMenu = document.querySelector(".off_screen_menu");
    const footerOpac = document.querySelector(".footer")
    const backgrOpac = document.querySelector(".impr_div")
    offScreenMenu.classList.toggle("active");
    footerOpac.classList.toggle("active");
    backgrOpac.classList.toggle("inactive");
};