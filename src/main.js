import { 
    getApiKey, 
    getApiTenant, 
    getApiMenu,
} from './api/api.js'
import { state } from './state/state.js'
import { displaySection } from './display.js'
import { renderMenu } from './menu/DOMmenu.js'
import { renderCart } from './cart/cart.js'

async function init() {

    await getApiKey()
    await getApiTenant()
    await getApiMenu()

    displaySection(0)
    renderMenu()
    renderCart()
}


init()