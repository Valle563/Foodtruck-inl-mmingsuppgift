import { resetOrder } from '../state/state.js'
import { displaySection } from '../display.js'
import { renderMenu } from '../menu/DOMmenu.js'
import { renderCart } from '../cart/cart.js'

export function initReceiptButtons() {
    const newOrderBtn = document.querySelector('#receipt-new-order-btn')
    if (!newOrderBtn) return

    newOrderBtn.addEventListener('click', () => {
        // Nollställ ALL orderdata
        resetOrder()

        // Töm kvitto-DOM helt
        document.querySelector('#receipt').innerHTML = ''

        // Visa menyn
        displaySection(0)

        // Rendera om UI från tom state
        renderMenu()
        renderCart()
    })
}