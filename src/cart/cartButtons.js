import { state, updateTotalPrice } from '../state/state.js'
import { displaySection } from '../display.js'
import { removeCartDomItem, updatePriceDom, updateQuantityDom, updateTotalPriceDom } from './cart.js'
import { getApiOrderInfo } from '../api/api.js'
import { addToCart } from '../menu/menuButtons.js'
import { renderWaiting } from '../waiting/waiting.js'

export function backToMenuBtn() {
    // Back / menu button (top-right cart icon)
    const backBtn = document.querySelector('#cart-btn-cart')
        backBtn.addEventListener('click', () => {
            displaySection(0)
        })
    }

// Order button
export function orderBtnFunction() {
    const orderBtn = document.querySelector('#order-btn')
    if (orderBtn) {
        orderBtn.addEventListener('click', placeOrder)
    }
}

// Increase buttons
export function increaseBtnFunction(target) {
    target.addEventListener(`click`, () => {
        const itemId = Number(target.dataset.id)
            addToCart(itemId)
            updateQuantityDom(itemId)
            updatePriceDom(itemId)
            updateTotalPrice()
            updateTotalPriceDom()
        }) 
}

    
    // Decrease buttons
   
    export function decreaseBtnFunction(target) {
    target.addEventListener(`click`, () => {
            const itemId = Number(target.dataset.id)
            console.log(itemId)
            decreaseQuantity(itemId)
            updateQuantityDom(itemId)
            updatePriceDom(itemId)
            updateTotalPrice()
            updateTotalPriceDom()
        }) 
}


function decreaseQuantity(itemId) {
    
    const item = state.cart.find(item => item.id === itemId)
    console.log('before', item.quantity)
    if (item) {
        item.quantity-- 
        
        if (item.quantity <= 0) {
            state.cart = state.cart.filter(item => item.id !== itemId)
            removeCartDomItem(itemId)
        }
    }
    console.log('after', item.quantity)
}

async function placeOrder() {
    state.order = state.cart.flatMap(item => Array(item.quantity).fill(item.id))
    
    await getApiOrderInfo()
    renderWaiting()
    displaySection(2)
}