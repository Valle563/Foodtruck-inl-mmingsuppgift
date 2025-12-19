import { state } from '../state/state.js'
import { displaySection } from '../display.js'
import { getApiReceipt } from '../api/api.js'
import { clearTimer } from './waiting.js'
import { renderReceipt } from '../receipt/receipt.js'

export function initWaitingButtons() {
    // Receipt button
    const receiptBtn = document.querySelector('#receipt-btn')
    if (receiptBtn) {
        receiptBtn.addEventListener('click', async () => {
            await getApiReceipt()
            renderReceipt()
            displaySection(3)
            clearTimer()
        })
    }
    
    // New order button
    const newOrderBtn = document.querySelector('#new-order-btn')
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', () => {
            state.cart = []
            state.order = []
            displaySection(0)
            clearTimer()
        })
    }
}