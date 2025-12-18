import { 
    getApiKey, 
    getApiTenant, 
    getApiMenu,
} from './api/api.js'
import { state } from './state/state.js'
import { displaySection } from './display.js'
import { renderMenu } from './menu/DOMmenu.js'
import { initMenuButtons } from './menu/menuButtons.js'
import { renderCart } from './cart/cart.js'
import { initCartButtons } from './cart/cartButtons.js'
import { renderWaiting } from './waiting/waiting.js'
import { initWaitingButtons } from './waiting/waitingButtons.js'
import { renderReceipt } from './receipt/receipt.js'
import { initReceiptButtons } from './receipt/receiptButtons.js'

async function init() {
    console.log('API KEY:', state.apiKey)

    await getApiKey()
    await getApiTenant()
    await getApiMenu()

    displaySection(0)
    renderMenu()
    initMenuButtons()
}

// Listen for section changes and initialize buttons accordingly
// const observer = new MutationObserver(() => {
//     const menu = document.querySelector('#menu')
//     const cart = document.querySelector('#cart')
//     const waiting = document.querySelector('#waiting')
//     const receipt = document.querySelector('#receipt')

//     const menuVisible = menu && window.getComputedStyle(menu).display !== 'none'
//     const cartVisible = cart && window.getComputedStyle(cart).display !== 'none'
//     const waitingVisible = waiting && window.getComputedStyle(waiting).display !== 'none'
//     const receiptVisible = receipt && window.getComputedStyle(receipt).display !== 'none'

//     if (menuVisible) {
//         renderMenu()
//         initMenuButtons()
//     } else if (cartVisible) {
//         renderCart()
//         initCartButtons()
//     } else if (waitingVisible) {
//         renderWaiting()
//         initWaitingButtons()
//     } else if (receiptVisible) {
//         renderReceipt()
//         initReceiptButtons()
//     }
// })

// observer.observe(document.body, { 
//     attributes: true, 
//     subtree: true, 
//     attributeFilter: ['style', 'class'] 
// })

init()