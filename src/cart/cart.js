import { state } from '../state/state.js'

export function renderCart() {
    const cartSection = document.querySelector('#cart')
    cartSection.innerHTML = '' // Töm först
    
    // Cart header
    const cartHeader = document.createElement('div')
    cartHeader.className = 'cart-header'
    
    const backBtn = document.createElement('button')
    backBtn.className = 'cart-back-btn'
    backBtn.id = 'cart-back-btn'
    backBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M10.667 14.667h10.666v2.666H10.667v-2.666zm0-5.334h10.666v2.667H10.667V9.333zM8 24c-.733 0-1.361-.261-1.883-.783A2.565 2.565 0 015.334 21.333V10.667c0-.734.26-1.361.783-1.884A2.565 2.565 0 018 8h16c.733 0 1.361.261 1.883.783.522.523.783 1.15.783 1.884v10.666c0 .734-.261 1.361-.783 1.884A2.565 2.565 0 0124 24H8zm0-2.667h16V10.667H8v10.666z" fill="#353131"/>
        </svg>
    `
    
    cartHeader.appendChild(backBtn)
    
    // Cart items container
    const cartItems = document.createElement('div')
    cartItems.className = 'cart-items'
    
    if (state.cart.length > 0) {
        state.cart.forEach(item => {
            const cartItem = createCartItem(item)
            cartItems.appendChild(cartItem)
        })
    } else {
        const emptyMsg = document.createElement('p')
        emptyMsg.className = 'empty-cart'
        emptyMsg.textContent = 'Din varukorg är tom'
        cartItems.appendChild(emptyMsg)
    }
    
    cartSection.appendChild(cartHeader)
    cartSection.appendChild(cartItems)
    
    // Cart footer (only if cart has items)
    if (state.cart.length > 0) {
        const cartFooter = createCartFooter()
        cartSection.appendChild(cartFooter)
    }
}

function createCartItem(item) {
    const cartItem = document.createElement('div')
    cartItem.className = 'cart-item'
    
    // Cart item header
    const itemHeader = document.createElement('div')
    itemHeader.className = 'cart-item-header'
    
    const itemName = document.createElement('h3')
    itemName.className = 'cart-item-name'
    itemName.textContent = item.name
    
    const itemPrice = document.createElement('span')
    itemPrice.className = 'cart-item-price'
    itemPrice.textContent = `${item.price * item.quantity} SEK`
    
    itemHeader.appendChild(itemName)
    itemHeader.appendChild(itemPrice)
    
    // Cart item controls
    const itemControls = document.createElement('div')
    itemControls.className = 'cart-item-controls'
    
    const decreaseBtn = document.createElement('button')
    decreaseBtn.className = 'quantity-btn decrease-btn'
    decreaseBtn.dataset.id = item.id
    decreaseBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#353131" stroke-width="2"/>
            <path d="M8 12h8" stroke="#353131" stroke-width="2"/>
        </svg>
    `
    
    const quantity = document.createElement('span')
    quantity.className = 'quantity'
    quantity.textContent = `${item.quantity} stycken`
    
    const increaseBtn = document.createElement('button')
    increaseBtn.className = 'quantity-btn increase-btn'
    increaseBtn.dataset.id = item.id
    increaseBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#353131" stroke-width="2"/>
            <path d="M12 8v8M8 12h8" stroke="#353131" stroke-width="2"/>
        </svg>
    `
    
    itemControls.appendChild(decreaseBtn)
    itemControls.appendChild(quantity)
    itemControls.appendChild(increaseBtn)
    
    cartItem.appendChild(itemHeader)
    cartItem.appendChild(itemControls)
    
    return cartItem
}

function createCartFooter() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const moms = Math.round(subtotal * 0.20)
    const total = subtotal + moms
    
    const cartFooter = document.createElement('div')
    cartFooter.className = 'cart-footer'
    
    // Total section
    const totalSection = document.createElement('div')
    totalSection.className = 'total-section'
    
    const totalLabel = document.createElement('div')
    totalLabel.className = 'total-label'
    
    const totalText = document.createElement('span')
    totalText.textContent = 'TOTALT'
    
    const momsText = document.createElement('span')
    momsText.className = 'moms-text'
    momsText.textContent = 'inkl 20% moms'
    
    totalLabel.appendChild(totalText)
    totalLabel.appendChild(momsText)
    
    const totalPrice = document.createElement('span')
    totalPrice.className = 'total-price'
    totalPrice.textContent = `${total} SEK`
    
    totalSection.appendChild(totalLabel)
    totalSection.appendChild(totalPrice)
    
    // Order button
    const orderBtn = document.createElement('button')
    orderBtn.className = 'order-btn'
    orderBtn.id = 'order-btn'
    orderBtn.textContent = 'TAKE MY MONEY!'
    
    cartFooter.appendChild(totalSection)
    cartFooter.appendChild(orderBtn)
    
    return cartFooter
}