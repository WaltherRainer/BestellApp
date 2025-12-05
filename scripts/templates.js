function getSingleCheckoutTempl(dish, size, qty, amount) {
    return `     
        <div class="shop_cart_menu">
            <h4>${getDishName(dish)}</h4>
            <h5>${sizeNaming(size)}</h5>
            <div class="shop_cart_entry">
                <img class="order_icons_small_size" 
                onclick="removeFromCart('${dish}', '${size}')" 
                src="./assets/icons/minus_orange.svg" alt="">
                <p>Anzahl: ${qty}</p>
                <img class="order_icons_small_size" 
                onclick="pushToCart('${dish}', '${size}')" 
                src="./assets/icons/plus_orange.svg" alt="">
                <p>Preis: ${amount}€</p>
                <img class="order_icons_small_size" 
                onclick="removeAll('${dish}', '${size}')" 
                src="./assets/icons/trash_orange.svg" alt="">
            </div>
        </div>
    `
}

function getHeaderTemp() {
    return `
        <header class="" style="grid-area: head_box">
            <a href="#"><img class="logo_img" src="./assets/img/Logo.png" alt="Logo"></a>
            <nav class="ham_menu" onclick="showHamMenuWhenShopCartOpen()">
                <div class="ham_menu_symb"></div>
                <div class="ham_menu_symb"></div>
                <div class="ham_menu_symb"></div>
            </nav>
        </header>
    `
}

function getShipTempl(active) {

    if (active) {
        return `
            <div class="pick_up">
                <div id="resp_shipping_costs">
                    <h4>Abholung bei uns im Restaurant</h4>
                </div>
                <label class="switch">
                    <input type="checkbox" onclick="toggleShpCosts()" id="shp_costs_switch" checked>
                    <span class="slider round" ></span>
                </label>
            </div>
        `
    }
    else {
    return `
        <div class="pick_up">
            <div id="resp_shipping_costs">
                <h4>Abholung bei uns im Restaurant</h4>
            </div>
            <label class="switch">
                <input type="checkbox" onclick="toggleShpCosts()" id="shp_costs_switch">
                <span class="slider round" ></span>
            </label>
        </div>
    `
    }

}

function getBasketHeaderTempl(amount, shpCosts, sum) {
    return `
            <table >
                <tr>
                    <td>
                        Zwischensumme
                    </td>
                    <td class="table_amount">
                        ${amount}€
                    </td>
                </tr>
                <tr>
                    <td>
                        Lieferkosten
                    </td>
                    <td class="table_amount" id="shp_costs">
                        ${shpCosts}€
                    </td>
                </tr>
                <tr class="table_sum_row">
                    <td>
                        Gesamt
                    </td>
                    <td class="table_amount">
                        ${sum}€
                    </td>
                </tr>
            </table>
            
            <button onclick="clearLocStor()" class="order_btn">Bestellen</button>
            <section class="shop_cart" style="grid-area: cart">
                <div class="pick_up">
                    <div id="shipping_costs">
                        <h4>Lieferung zu Ihnen nach Hause</h4>
                    </div>
                    <label class="switch">
                        <input type="checkbox" onclick="toggleShpCosts()" id="shp_costs_switch">
                        <span class="slider round" ></span>
                    </label>
                </div>
            </section>
    `
    
}

function getSumTempl(amount, shpCosts, sum) {
    return `
        <section class="costs_to_pay">
            <table >
                <tr>
                    <td>
                        Zwischensumme
                    </td>
                    <td class="table_amount">
                        ${amount}€
                    </td>
                </tr>
                <tr>
                    <td>
                        Lieferkosten
                    </td>
                    <td class="table_amount" id="shp_costs">
                        ${shpCosts}€
                    </td>
                </tr>
                <tr class="table_sum_row">
                    <td>
                        Gesamt
                    </td>
                    <td class="table_amount">
                        ${sum}€
                    </td>
                </tr>

            </table>
            <button onclick="clearLocStor()" class="order_btn">Bestellen</button>
        
        
    `
}

function getMenuTempl(dish) {
    return `
        <div class="menue">
            <div>
                <h3>${getDishName(dish)}</h3>
                <h5>${getDishDescr(dish)}</h5>
                <table>
                    <tr>
                        <td>
                            ${sizeNaming('smallSize')}
                        </td>
                        <td>
                            ${formatedNumber(getPrice(dish, 'smallSize'))} €
                        </td>
                        <td>
                            <img onclick="pushToCart('${dish}', 'smallSize')" 
                            class="order_icons_mid_size" src="./assets/icons/plus-circle.svg" 
                            alt="Hinzufügen">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${sizeNaming('medSize')}
                        </td>
                        <td>
                            ${formatedNumber(getPrice(dish, 'medSize'))} €
                        </td>
                        <td>
                            <img onclick="pushToCart('${dish}', 'medSize')" 
                            class="order_icons_mid_size" src="./assets/icons/plus-circle.svg" 
                            alt="Hinzufügen">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${sizeNaming('largeSize')}
                        </td>
                        <td>
                            ${formatedNumber(getPrice(dish, 'largeSize'))} €
                        </td>
                        <td>
                            <img onclick="pushToCart('${dish}', 'largeSize')" 
                            class="order_icons_mid_size" src="./assets/icons/plus-circle.svg" 
                            alt="Hinzufügen">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `
}


function sizeNaming(size) {
    let naming = '';
    if (size == 'smallSize') {
        naming = 'klein, ca. 28cm';
    } 
    else if (size == 'medSize') {
        naming = 'mittel, ca. 32cm';
    }
    else if (size == 'largeSize') {
        naming = 'groß, ca. 36cm';
    };
    return naming
};