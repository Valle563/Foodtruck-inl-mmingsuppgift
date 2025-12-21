import { state, updateTotalPrice } from '../state/state.js'
import { backToMenuBtn, decreaseBtnFunction, increaseBtnFunction, orderBtnFunction } from './cartButtons.js'

export function renderCart() {
    const cartSection = document.querySelector('#cart')
    cartSection.innerHTML = '' // Töm först
    // Cart icon container (top-right)
    const cartIconContainer = document.createElement('div')
    cartIconContainer.className = 'cart-icon-container'
    const cartBtn = document.createElement('button')
    cartBtn.className = 'cart-btn'
    cartBtn.id = 'cart-btn-cart'
    cartBtn.innerHTML = `<img class="cart-icon-img" src="./assets/images/cart.svg" alt="cart">`
    // show badge (consistent with menu) when there are items
    if (state.cart.length > 0) {
        const badge = document.createElement('span')
        badge.className = 'cart-badge'
        badge.textContent = state.cart.length
        cartBtn.appendChild(badge)
    }
    

    cartIconContainer.appendChild(cartBtn)
    const cartItemSection = document.createElement('div')
    cartItemSection.classList.add('cart-item-section')
    const cartFooterSection = document.createElement('div')
    cartFooterSection.classList.add('cart-footer-section')
    cartSection.append(cartIconContainer, cartItemSection, cartFooterSection)
    
    backToMenuBtn()
    createCartFooter()
}

export function createCartItem(item) {
    
    console.log('createCartItem', item)
    const itemName = document.createElement('h3')
    itemName.className = 'cart-item-name'
    itemName.textContent = item.name
    
    const itemPrice = document.createElement('span')
    itemPrice.className = 'cart-item-price'
    itemPrice.textContent = `${item.price * item.quantity} SEK`
    console.log('price, quantity', item.price, item.quantity)
    
    const titleRow = document.createElement('div')
    titleRow.className = 'title-row'
    
    const dottedLine = document.createElement('span')
    dottedLine.className = 'dotted-line'
    
    titleRow.append(itemName, dottedLine, itemPrice)
    
    // Buttons go in the header right side (swap with price)
    const decreaseBtn = document.createElement('button')
    decreaseBtn.className = 'quantity-btn decrease-btn'
    decreaseBtn.dataset.id = item.id
    decreaseBtn.textContent = '−'
    
    const increaseBtn = document.createElement('button')
    increaseBtn.className = 'quantity-btn increase-btn'
    increaseBtn.dataset.id = item.id
    increaseBtn.textContent = '+'
    
    increaseBtnFunction(increaseBtn)
    decreaseBtnFunction(decreaseBtn)
    const quantity = document.createElement('span')
    quantity.className = 'quantity'
    quantity.textContent = 
    item.quantity === 1
    ? `${item.quantity} styck`
    : `${item.quantity} stycken`
    
    const cartControls = document.createElement('div')
    cartControls.className = 'cart-item-controls'
    
    cartControls.append(decreaseBtn, quantity, increaseBtn)
    
    // TODO anropa två funtioner som stoppar event.listener på knapparna 
    
    const cartItem = document.createElement('div')
    cartItem.className = 'cart-item'
    cartItem.dataset.id = item.id
    cartItem.append(titleRow, cartControls)
    
    const cartItemSection = document.querySelector('.cart-item-section')
    cartItemSection.appendChild(cartItem)
}

export function removeCartDomItem(itemId) {

    document.querySelector(`.cart-item[data-id="${itemId}"]`).remove()
}

export function updateQuantityDom(itemId) {
    const item = state.cart.find(item => item.id === itemId)
    if(!item)return
    const placement = document.querySelector(`.cart-item[data-id="${itemId}"] .quantity`)
    if(item.quantity === 1) {
        placement.textContent = `${item.quantity} styck`
    }else {
        placement.textContent = `${item.quantity} stycken`
    }
}

export function updatePriceDom(itemId) {
    const item = state.cart.find(item => item.id === itemId)
    if(!item)return
    const placement = document.querySelector(`.cart-item[data-id="${itemId}"] .cart-item-price`)
    placement.textContent = `${item.price * item.quantity} SEK`
}
export function updateTotalPriceDom(){
    const placement = document.querySelector('.total-price')
    placement.textContent = `${state.totalPrice} SEK`
}
function createCartFooter() {
    // const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    // const moms = Math.round(subtotal * 0.20) 
    // const total = subtotal + moms

    const cartFooter = document.createElement('div')
    cartFooter.className = 'cart-footer'

    // Total section (solid gray)
    const totalSection = document.createElement('div')
    totalSection.className = 'total-section'

    const totalLabel = document.createElement('div')
    totalLabel.className = 'total-label'

    const totalText = document.createElement('h3')
    totalText.textContent = 'TOTALT'

    const momsText = document.createElement('p')
    momsText.className = 'moms-text'
    momsText.textContent = 'inkl 20% moms'

    totalLabel.appendChild(totalText)
    totalLabel.appendChild(momsText)

    const totalPrice = document.createElement('h2')
    totalPrice.className = 'total-price'
    totalPrice.textContent = `${state.totalPrice} SEK`

    totalSection.appendChild(totalLabel)
    totalSection.appendChild(totalPrice)

    // Order button
    const orderBtn = document.createElement('button')
    orderBtn.className = 'order-btn'
    orderBtn.id = 'order-btn'
    orderBtn.textContent = 'TAKE MY MONEY!'

    cartFooter.appendChild(totalSection)
    cartFooter.appendChild(orderBtn)

    document.querySelector('.cart-footer-section').appendChild(cartFooter)
    
    orderBtnFunction()
    
}

