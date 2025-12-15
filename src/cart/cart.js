import { state } from '../state/state.js'

export function renderCart() {
    const cartSection = document.getElementById('cart')
    
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const moms = Math.round(subtotal * 0.20)
    const total = subtotal + moms
    
    cartSection.innerHTML = `
        <div class="cart-header">
            <button class="cart-back-btn" id="cart-back-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M10.667 14.667h10.666v2.666H10.667v-2.666zm0-5.334h10.666v2.667H10.667V9.333zM8 24c-.733 0-1.361-.261-1.883-.783A2.565 2.565 0 015.334 21.333V10.667c0-.734.26-1.361.783-1.884A2.565 2.565 0 018 8h16c.733 0 1.361.261 1.883.783.522.523.783 1.15.783 1.884v10.666c0 .734-.261 1.361-.783 1.884A2.565 2.565 0 0124 24H8zm0-2.667h16V10.667H8v10.666z" fill="#353131"/>
                </svg>
            </button>
        </div>
        
        <div class="cart-items">
            ${state.cart.length > 0 ? renderCartItems() : '<p class="empty-cart">Din varukorg är tom</p>'}
        </div>
        
        ${state.cart.length > 0 ? `
            <div class="cart-footer">
                <div class="total-section">
                    <div class="total-label">
                        <span>TOTALT</span>
                        <span class="moms-text">inkl 20% moms</span>
                    </div>
                    <span class="total-price">${total} SEK</span>
                </div>
                <button class="order-btn" id="order-btn">TAKE MY MONEY!</button>
            </div>
        ` : ''}
    `
}

function renderCartItems() {
    return state.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-header">
                <h3 class="cart-item-name">${item.name}</h3>
                <span class="cart-item-price">${item.price * item.quantity} SEK</span>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" stroke="#353131" stroke-width="2"/>
                        <path d="M8 12h8" stroke="#353131" stroke-width="2"/>
                    </svg>
                </button>
                <span class="quantity">${item.quantity} stycken</span>
                <button class="quantity-btn increase-btn" data-id="${item.id}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" stroke="#353131" stroke-width="2"/>
                        <path d="M12 8v8M8 12h8" stroke="#353131" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('')
}