import { state } from '../state/state.js'
import { displaySection } from '../display.js'
import { createCartItem, renderCart } from '../cart/cart.js'

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
        console.log(state.cart)
    }) 
}

export function dipButtons(target) {
    // Dip buttons
     target.addEventListener(`click`, () => {
        addToCart(target.dataset.id)
        console.log(state.cart)
    }) 
}

export function drinkButtons(target) {
    // Drink buttons
     target.addEventListener(`click`, () => {
        addToCart(target.dataset.id)
        console.log(state.cart)
    }) 
}

function addToCart(itemId) {
    const existingItem = state.cart.find(item => item.id === Number(itemId))
    
    if (existingItem) {
        existingItem.quantity++
    } else {
        const menuItem = state.menu.find(item => item.id === Number(itemId))
        
        if(menuItem) {
            state.cart.push({
                ...menuItem,
                quantity: 1
            })
            console.log(menuItem)
            createCartItem(menuItem)
        }
    }
}