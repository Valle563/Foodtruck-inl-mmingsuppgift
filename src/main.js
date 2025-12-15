// import { 
//     getApiKey, 
//     getApiTenant, 
//     getApiMenu,
// } from './api/api.js'
// import { state } from './state/state.js'
// import { displaySection } from './display.js'

// async function init() {

//     console.log('API KEY:', state.apiKey)

//     await getApiKey()
//     await getApiTenant()
//     await getApiMenu()

//     displaySection('0')
// }

// init()


import { 
    getApiKey, 
    getApiTenant, 
    getApiMenu,
} from './api/api.js'
import { state } from './state/state.js'
import { displaySection } from './display.js'
import { renderMenu } from '.domMenu.js'
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
const observer = new MutationObserver(() => {
    const menu = document.getElementById('menu')
    const cart = document.getElementById('cart')
    const waiting = document.getElementById('waiting')
    const receipt = document.getElementById('receipt')
    
    if (!menu.classList.contains('remove-display')) {
        initMenuButtons()
    } else if (!cart.classList.contains('remove-display')) {
        renderCart()
        initCartButtons()
    } else if (!waiting.classList.contains('remove-display')) {
        renderWaiting()
        initWaitingButtons()
    } else if (!receipt.classList.contains('remove-display')) {
        renderReceipt()
        initReceiptButtons()
    }
})

observer.observe(document.body, { 
    attributes: true, 
    subtree: true, 
    attributeFilter: ['class'] 
})

init()