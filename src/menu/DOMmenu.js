import { state } from '../state/state.js'

export function renderMenu() {
    const menuSection = document.getElementById('menu')
    
    menuSection.innerHTML = `
        <div class="cart-icon-container">
            <button class="cart-btn" id="cart-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M10.667 14.667h10.666v2.666H10.667v-2.666zm0-5.334h10.666v2.667H10.667V9.333zM8 24c-.733 0-1.361-.261-1.883-.783A2.565 2.565 0 015.334 21.333V10.667c0-.734.26-1.361.783-1.884A2.565 2.565 0 018 8h16c.733 0 1.361.261 1.883.783.522.523.783 1.15.783 1.884v10.666c0 .734-.261 1.361-.783 1.884A2.565 2.565 0 0124 24H8zm0-2.667h16V10.667H8v10.666z" fill="#353131"/>
                </svg>
                ${state.cart.length > 0 ? `<span class="cart-badge">${state.cart.length}</span>` : ''}
            </button>
        </div>
        <h1 class="menu-title">MENY</h1>
        <div class="menu-container">
            <div class="wontons-section">
                ${renderWontons()}
            </div>
            <div class="dips-section">
                <h2 class="section-title">DIPSÅS <span class="price">19 SEK</span></h2>
                <div class="dips-grid">
                    ${renderDips()}
                </div>
            </div>
            <div class="drinks-section">
                <h2 class="section-title">DRICKA <span class="price">19 SEK</span></h2>
                <div class="drinks-grid">
                    ${renderDrinks()}
                </div>
            </div>
        </div>
    `
}

function renderWontons() {
    const wontons = state.menu.filter(item => item.type === 'wonton')
    return wontons.map(wonton => `
        <div class="wonton-item" data-id="${wonton.id}">
            <div class="wonton-header">
                <h3 class="wonton-name">${wonton.name}</h3>
                <span class="wonton-price">${wonton.price} SEK</span>
            </div>
            <p class="wonton-ingredients">${wonton.ingredients.join(', ')}</p>
            <div class="wonton-line"></div>
        </div>
    `).join('')
}

function renderDips() {
    const dips = state.menu.filter(item => item.type === 'dip')
    return dips.map(dip => `
        <button class="menu-btn dip-btn" data-id="${dip.id}">
            ${dip.name}
        </button>
    `).join('')
}

function renderDrinks() {
    const drinks = state.menu.filter(item => item.type === 'drink')
    return drinks.map(drink => `
        <button class="menu-btn drink-btn" data-id="${drink.id}">
            ${drink.name}
        </button>
    `).join('')
}