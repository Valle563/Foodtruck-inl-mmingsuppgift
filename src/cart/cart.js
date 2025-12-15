import { state } from '../state/state.js'
import { displaySection } from '../display.js'

export function renderCart() {
    const cartSection = document.querySelector('#cart')
    cartSection.innerHTML = '' // Töm först
    // Cart icon container (top-right)
    const cartIconContainer = document.createElement('div')
    cartIconContainer.className = 'cart-icon-container'
    const cartBtn = document.createElement('button')
    cartBtn.className = 'cart-btn'
    cartBtn.id = 'cart-btn'
    cartBtn.innerHTML = `<img class="cart-icon-img" src="./assets/images/cart.svg" alt="cart">`
    // show badge (consistent with menu) when there are items
    if (state.cart.length > 0) {
        const badge = document.createElement('span')
        badge.className = 'cart-badge'
        badge.textContent = state.cart.length
        cartBtn.appendChild(badge)
    }
    // clicking the cart icon in the cart view goes back to the menu
    cartBtn.addEventListener('click', () => displaySection(0))
    cartIconContainer.appendChild(cartBtn)
    cartSection.appendChild(cartIconContainer)
    
    // Cart header (keeps icon placement consistent with menu)
    const cartHeader = document.createElement('div')
    cartHeader.className = 'cart-header'

    
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

    // Cart item header (name left, buttons right)
    const itemHeader = document.createElement('div')
    itemHeader.className = 'cart-item-header'

    const itemName = document.createElement('h3')
    itemName.className = 'cart-item-name'
    itemName.textContent = item.name

    // Buttons go in the header right side (swap with price)
    const decreaseBtn = document.createElement('button')
    decreaseBtn.className = 'quantity-btn decrease-btn'
    decreaseBtn.dataset.id = item.id
    decreaseBtn.setAttribute('aria-label', 'Minska antal')
    decreaseBtn.textContent = '−'

    const increaseBtn = document.createElement('button')
    increaseBtn.className = 'quantity-btn increase-btn'
    increaseBtn.dataset.id = item.id
    increaseBtn.setAttribute('aria-label', 'Öka antal')
    increaseBtn.textContent = '+'

    const headerRight = document.createElement('div')
    headerRight.className = 'header-right'
    // test
    const quantity = document.createElement('span')
    quantity.className = 'quantity'
    quantity.textContent = 
        item.quantity === 1
            ? `${item.quantity} styck`
            : `${item.quantity} stycken`

    headerRight.appendChild(decreaseBtn)
    headerRight.appendChild(quantity)
    headerRight.appendChild(increaseBtn)

    itemHeader.appendChild(itemName)
    itemHeader.appendChild(headerRight)

    // Cart item controls (price left, quantity text right)
    const itemControls = document.createElement('div')
    itemControls.className = 'cart-item-controls'

    const itemPrice = document.createElement('span')
    itemPrice.className = 'cart-item-price'
    itemPrice.textContent = `${item.price * item.quantity} SEK`

    itemControls.appendChild(itemPrice)
    // const quantity = document.createElement('span')
    // quantity.className = 'quantity'
    // quantity.textContent = `${item.quantity} stycken`

    // itemControls.appendChild(quantity)

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

    // Total section (solid gray)
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