
let allDishes = [
    {
        'dish' : 'PMagherita',
        'name' : 'Pizza Magherita',
        'price':{'smallSize' : 13.90, 'medSize' : 15.90, 'largeSize' : 17.90},
        'descr' : 'Pizza mit Tomaten und Mozarella Käse',
        'cat' : 'Pizza'
    },
    {
        'dish' : 'PSalami',
        'name' : 'Pizza Salami',
        'price':{'smallSize' : 13.90, 'medSize' : 19.90, 'largeSize' : 17.90},
        'descr' : 'Pizza mit Salami und Käse',
        'cat' : 'Pizza'
    },
    {
        'dish' : 'PCalzone',
        'name' : 'Pizza Calzone',
        'price':{'smallSize' : 14.90, 'medSize' : 16.90, 'largeSize' : 18.90},
        'descr' : 'Pizza mit Salami, Pilzen Schinken und Käse zusammengeklappt',
        'cat' : 'Pizza'
    },
    {
        'dish' : 'PDiavolo',
        'name' : 'Pizza Diavolo',
        'price':{'smallSize' : 13.90, 'medSize' : 15.90, 'largeSize' : 17.90},
        'descr' : 'Pizza mit Peperoniwurst, Pilzen und Käse',
        'cat' : 'Pizza'
    },
    {
        'dish' : 'PVierK',
        'name' : 'Pizza Vier Käse',
        'price':{'smallSize' : 15.90, 'medSize' : 18.90, 'largeSize' : 21.90},
        'descr' : 'Pizza mit vier Käse Sorten',
        'cat' : 'Pizza'
    },
    {
        'dish' : 'PHawaii',
        'name' : 'Pizza Hawaii',
        'price':{'smallSize' : 18.90, 'medSize' : 21.90, 'largeSize' : 29.90},
        'descr' : 'Pizza mit Schinken und Ananas',
        'cat' : 'Pizza'
    },
    {
        'dish' : 'SBolognese',
        'name' : 'Spaghetti Bolognese',
        'price':{'smallSize' : 18.90, 'medSize' : 21.90, 'largeSize' : 29.90},
        'descr' : 'Pizza mit Schinken und Ananas',
        'cat' : 'Pasta'
    },
]

let cart = [];
let shpCosts = 5;

function toggleShpCosts() {    
    if (shpCosts == 5) {
        shpCosts = 0
        renderCheckout();
        renderRespCheckout();
        setPickUp(true);
    }
    else {
        shpCosts = 5
        renderCheckout();
        renderRespCheckout();
        setPickUp(false);
    }
};

function setPickUp(pickUp) {
    document.getElementById('shipping_costs').innerHTML = ""

    let shpCostObj = document.getElementById('shipping_costs');
    if (pickUp) {
        shpCostObj.innerHTML = `<h4>Abholung bei uns im Restaurant</h4>`
    }
    else {
        shpCostObj.innerHTML = `<h4>Lieferung zu Ihnen nach Hause</h4>`
    }
};

function saveCartData() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function getCartData() {
    let recText = localStorage.getItem('cart');
    let obj = JSON.parse(recText);
    cart = obj;
}

function clearLocStor() {
    localStorage.clear();
    cart = [];
    renderCheckout();
    renderRespCheckout();
}

function initCart() {
    renderMenu();
    let myArray = JSON.parse(localStorage.getItem('cart'));
    if (myArray != null) {
        cart = myArray;
        renderCheckout();
        renderRespCheckout();
    }
    else {
        document.getElementById('shopping_cart').innerHTML =
        getBasketHeaderTempl(formatedNumber(0),formatedNumber(5), formatedNumber(5));

        document.getElementById('resp_shopping_cart').innerHTML =
        getSumTempl(formatedNumber(0),formatedNumber(5), formatedNumber(5));
    };

};

function renderMenu() {
    let objKeys = Object.keys(allDishes);
    document.getElementById('menues').innerHTML = ""
    for (let i = 0; i < objKeys.length; i++) {
        let MyDish = allDishes[objKeys[i]].dish
        document.getElementById('menues').innerHTML += 
        getMenuTempl(MyDish);
    };
}

function renderRespCheckout() {
    let objKeys = Object.keys(cart);
    let sum = 0;
    document.getElementById('resp_shopping_cart').innerHTML = "";
    for (let i = 0; i < objKeys.length; i++) {
        const myDish = cart[objKeys[i]].dish;
        const mySize = cart[objKeys[i]].size;
        const myQty = cart[objKeys[i]].qty;
        const myPrice = cart[objKeys[i]].price;
        sum += myPrice

    document.getElementById('resp_shopping_cart').innerHTML += 
    getSingleCheckoutTempl(myDish, mySize, myQty, formatedNumber(myPrice));
    };

    document.getElementById('resp_shopping_cart').innerHTML +=
    getSumTempl(formatedNumber(sum), formatedNumber(shpCosts), 
    formatedNumber(sum + shpCosts));

    document.getElementById('resp_shopping_cart').innerHTML +=
    getShipTempl(shpCosts == 5);
}

function renderCheckout() {
    let objKeys = Object.keys(cart);
    let sum = 0;
    document.getElementById('shopping_cart').innerHTML = "";
    document.getElementById('basket_header').innerHTML = "";

    for (let i = 0; i < objKeys.length; i++) {
        const myDish = cart[objKeys[i]].dish;
        const mySize = cart[objKeys[i]].size;
        const myQty = cart[objKeys[i]].qty;
        const myPrice = cart[objKeys[i]].price;
        sum += myPrice
    document.getElementById('shopping_cart').innerHTML += 
    getSingleCheckoutTempl(myDish, mySize, myQty, formatedNumber(myPrice));
    };
    
    document.getElementById('basket_header').innerHTML +=
    getBasketHeaderTempl(formatedNumber(sum), formatedNumber(shpCosts), 
    formatedNumber(sum + shpCosts));

    document.getElementById('basket_header').innerHTML +=
    getShipTempl(shpCosts == 5);

};

function pushToCart(dish, size) {
    let price = getPrice(dish, size);
    let objKeys = Object.keys(cart)

    if (isInCart(dish, size)) {
        for (let i = 0; i < objKeys.length; i++) {
                const myDish = cart[objKeys[i]].dish;
                const mySize = cart[objKeys[i]].size;
                if (myDish == dish && mySize == size) {
                    cart[objKeys[i]].qty++;
                    cart[objKeys[i]].price += price;
                }
        }
    }
    else {
        let myObj = 
            {
                'dish' : dish,
                'size' : size,
                'price' : price,
                'qty' : 1
            }
        cart.push(myObj);
    }
    saveCartData();
    renderCheckout();
    renderRespCheckout();
}

function removeFromCart(dish, size) {
    let price = getPrice(dish, size);
    let existingItem = cart.find(item =>
        item.dish === dish && item.size === size
    );
    if (!existingItem) return;
    existingItem.qty--;
    existingItem.price -= price;
    if (existingItem.qty <= 0) {
        cart = cart.filter(item => !(item.dish === dish && item.size === size));
    }
    saveCartData();
    renderCheckout();
    renderRespCheckout();
};

function removeAll(dish, size) {
    cart = cart.filter(item => !(item.dish === dish && item.size === size))
    saveCartData();
    renderCheckout();
    renderRespCheckout();
}

function isInCart(dish, size) {
    let objKeys = Object.keys(cart)
    for (let i = 0; i < objKeys.length; i++) {
        const myDish = cart[objKeys[i]].dish;
        const mySize = cart[objKeys[i]].size;
        if (myDish == dish && mySize == size) {
            return true
        };
    };
};

function getPrice(dish, size) {
    const dishObj = allDishes.find(item => item.dish === dish);
    return dishObj.price[size]
}

function getDishName(dish) {
    const dishObj = allDishes.find(item => item.dish === dish);
    return dishObj.name
}

function getDishDescr(dish) {
    const dishObj = allDishes.find(item => item.dish === dish);
    return dishObj.descr
}

function formatedNumber(number) {
    return number.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}