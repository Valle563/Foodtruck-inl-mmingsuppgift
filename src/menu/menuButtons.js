import { state, updateTotalPrice } from '../state/state.js'
import { displaySection } from '../display.js'
import { createCartItem, updateQuantityDom, updatePriceDom, updateTotalPriceDom } from '../cart/cart.js'
import { updateCartBadge } from './DOMmenu.js'

export function initMenuCartButton() {
    // Cart button
    const cartBtn = document.querySelector('#cart-btn-menu')
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            displaySection(1)
        })
    }
}

export function wontonButtons(target) {
    // Wonton items

    target.addEventListener(`click`, () => {
        addToCart(target.dataset.id)
        
    }) 
}

export function dipButtons(target) {
    // Dip buttons
     target.addEventListener(`click`, () => {
        addToCart(target.dataset.id)
        
    }) 
}

export function drinkButtons(target) {
    // Drink buttons
     target.addEventListener(`click`, () => {
        addToCart(target.dataset.id)
        
    }) 
}


export function addToCart(itemId) {
    const id = Number(itemId)
    const existingItem = state.cart.find(item => item.id === id)

    if (existingItem) {
        existingItem.quantity++
        updateQuantityDom(id)
        updatePriceDom(id)
    } else {
        const menuItem = state.menu.find(item => item.id === id)
        if (menuItem) {
            const newItem = { ...menuItem, quantity: 1 }
            state.cart.push(newItem)
            createCartItem(newItem)
        }
    }

    updateTotalPrice()
    updateTotalPriceDom()
    updateCartBadge()
}