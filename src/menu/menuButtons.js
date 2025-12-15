import { state } from '../state/state.js'
import { displaySection } from '../display.js'

export function initMenuButtons() {
    // Cart button
    const cartBtn = document.querySelector('#cart-btn')
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            displaySection(1)
        })
    }
    
    // Wonton items
    document.querySelectorAll('.wonton-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            addToCart(id)
        })
    })
    
    // Dip buttons
    document.querySelectorAll('.dip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            addToCart(id)
        })
    })
    
    // Drink buttons
    document.querySelectorAll('.drink-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            addToCart(id)
        })
    })
}

function addToCart(itemId) {
    const existingItem = state.cart.find(item => item.id === itemId)
    
    if (existingItem) {
        existingItem.quantity++
    } else {
        const menuItem = state.menu.find(item => item.id === itemId)
        state.cart.push({
            ...menuItem,
            quantity: 1
        })
    }
    
    renderMenu()
    initMenuButtons()
}