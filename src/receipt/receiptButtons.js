import { state } from '../state/state.js'
import { displaySection } from '../display.js'

export function initReceiptButtons() {
    // New order button
    const newOrderBtn = document.querySelector('#receipt-new-order-btn')
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', () => {
            state.cart = []
            state.order = []
            displaySection(0)
        })
    }
}