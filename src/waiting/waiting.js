import { state } from '../state/state.js'
import { initWaitingButtons } from './waitingButtons.js'

export function renderWaiting() {
    const waitingSection = document.querySelector('#waiting')
    waitingSection.innerHTML = '' // Töm först
    
    const waitingContainer = document.createElement('div')
    waitingContainer.className = 'waiting-container'
    
    // Waiting box
    const waitingBoxImg = document.createElement('div')
    waitingBoxImg.className = 'waiting-box-img'
    waitingBoxImg.innerHTML = `<img class="waiting-box-img" src="./assets/images/boxtop.png" alt="waiting-box-img">` 
    
    const wontonBox = document.createElement('div')
    wontonBox.className = 'wonton-box'
    
    const logoBadge = document.createElement('div')
    logoBadge.className = 'logo-badge'
    
    const logoText = document.createElement('span')
    logoText.className = 'logo-text'
    
    logoBadge.appendChild(logoText)
    wontonBox.appendChild(logoBadge)
    waitingBoxImg.appendChild(wontonBox)
    
    // Title
    const title = document.createElement('h2')
    title.className = 'waiting-title'
    title.textContent = 'DINA WONTONS TILLAGAS!'
    
    // ETA
    const eta = document.createElement('p')
    eta.className = 'waiting-eta'

    // Order ID
    const orderId = document.createElement('p')
    orderId.className = 'waiting-order-id'
    // orderId.textContent = `#${state.orderId.toUpperCase()}`
    orderId.textContent = state.orderId
    ? `#${state.orderId.toUpperCase()}`
    : '#----'
    
    // Receipt button
    const receiptBtn = document.createElement('button')
    receiptBtn.className = 'receipt-btn'
    receiptBtn.id = 'receipt-btn'
    receiptBtn.textContent = 'SE KVITTO'
    
    // New order button
    const newOrderBtn = document.createElement('button')
    newOrderBtn.className = 'new-order-btn'
    newOrderBtn.id = 'new-order-btn'
    newOrderBtn.textContent = 'GÖR EN NY BESTÄLLNING'
    
    waitingContainer.appendChild(waitingBoxImg)
    waitingContainer.appendChild(title)
    waitingContainer.appendChild(eta)
    waitingContainer.appendChild(orderId)
    waitingContainer.appendChild(receiptBtn)
    waitingContainer.appendChild(newOrderBtn)
    
    waitingSection.appendChild(waitingContainer)

    

    setTimer()
    initWaitingButtons()
    
}



let timerTracker = null
let seconds = 0



function setTimer() {
    const etaEl = document.querySelector('.waiting-eta')

    if (!state.eta || !state.timestamp) {
        etaEl.textContent = 'ETA OKÄND'
        return
    }

    let seconds = Math.floor((state.eta - state.timestamp) / 1000)

    if (timerTracker) clearInterval(timerTracker)

    timerTracker = setInterval(() => {
        if (seconds <= 0) {
            etaEl.textContent = 'DIN MAT ÄR KLAR!'
            clearInterval(timerTracker)
            return
        }

        const minutes = Math.ceil(seconds / 60)
        etaEl.textContent = `ETA ${minutes} MIN`
        seconds--
    }, 1000)
}

export function clearTimer() {
    const eta = document.querySelector('.waiting-eta')
    clearInterval(timerTracker)
    timerTracker = null
    eta.innerHTML = ''
}

