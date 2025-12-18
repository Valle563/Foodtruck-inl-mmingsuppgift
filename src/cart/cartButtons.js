import { state } from '../state/state.js'
import { displaySection } from '../display.js'
import { renderCart } from './cart.js'
import { getApiOrderInfo } from '../api/api.js'

export function backToMenuBtn() {
    console.log('test1')
    // Back / menu button (top-right cart icon)
    const backBtn = document.querySelector('#cart-btn-cart')
    console.log(backBtn)
        backBtn.addEventListener('click', () => {
            console.log('test')
            displaySection(0)
        })
    }

    export function orderBtn() {
        const orderBtn = document.querySelector('#order-btn')
        if (orderBtn) {
            orderBtn.addEventListener('click', placeOrder)
        }
    }
    // Order button
    
    // Increase buttons
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            updateQuantity(id, 1)
        })
    })
    
    // Decrease buttons
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            updateQuantity(id, -1)
            console.log('test2', id)
        })
    })


function updateQuantity(itemId, change) {
    console.log('test5')
    const item = state.cart.find(item => item.id === itemId)
    
    if (item) {
        item.quantity += change
        
        if (item.quantity <= 0) {
            state.cart = state.cart.filter(item => item.id !== itemId)
        }
        
        renderCart()
        initCartButtons()
    }
}

async function placeOrder() {
    state.order = state.cart.flatMap(item => Array(item.quantity).fill(item.id))
    
    await getApiOrderInfo()
    
    displaySection(2)
}