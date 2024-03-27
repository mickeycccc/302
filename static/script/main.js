if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', start)
} else {
    start()
}

function start() {
    var removecartbutt = document.getElementsByClassName('rbutt')
    for (var i = 0; i < removecartbutt.length; i++) {
        var button = removecartbutt[i]
        button.addEventListener('click', removeitem)
    }

    var quantityInputs = document.getElementsByClassName('cartnuminput')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', numchange)
    }

    var addToCartButtons = document.getElementsByClassName('buynow')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchases')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cItem = document.getElementsByClassName('cart-items')[0]
    while (cItem.hasChildNodes()) {
        cItem.removeChild(cItem.firstChild)
    }
    updcart()
}

function removeitem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updcart()
}

function numchange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updcart()
}

function addToCartClicked(event) {
    var button = event.target
    var productinf = button.parentElement.parentElement
    var prodname = productinf.getElementsByClassName('pname')[0].innerText
    var price = productinf.getElementsByClassName('pprice')[0].innerText
    var Cimage = productinf.getElementsByClassName('image')[0].src
    addItemToCart(prodname, price, Cimage)
    updcart()
}

function addItemToCart(prodname, price, Cimage) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cItem = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cItem.getElementsByClassName('cart-item-prodname')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == prodname) {
            alert('This item is already added to the cart!')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${Cimage}" width="100" height="100">
            <span class="cart-item-prodname">${prodname}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cartnuminput" type="number" value="1">
            <button class="btn rbutt" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cItem.append(cartRow)
    cartRow.getElementsByClassName('rbutt')[0].addEventListener('click', removeitem)
    cartRow.getElementsByClassName('cartnuminput')[0].addEventListener('change', numchange)
}

function updcart() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var qel = cartRow.getElementsByClassName('cartnuminput')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = qel.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('ctotal-price')[0].innerText = '$' + total
}
