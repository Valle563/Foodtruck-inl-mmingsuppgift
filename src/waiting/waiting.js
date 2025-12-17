import { state } from '../state/state.js'

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
    orderId.textContent = `#${state.orderId.toUpperCase()}`
    
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
}

let timerTracker = null
let seconds = 0


// timer ( hjälp av andreas )
function setTimer() {
    const eta = document.querySelector('.waiting-eta')
    const timeLeftMiliseconds = state.eta-state.timestamp
    seconds = Math.floor(timeLeftMiliseconds / 1000)
    
    if (timerTracker) {
        clearInterval(timerTracker)
    } 
    timerTracker = setInterval(() => {
        const minutes = Math.floor(seconds / 60)
        if( seconds >= 0 ){
            eta.textContent = `ETA ${minutes} MIN`
        }else {
            eta.textContent = `DIN MAT ÄR KLAR!`
        }
        seconds--
    }, 1000)
}

export function clearTimer() {
    clearInterval(timerTracker)
    timerTracker = null
    eta.innerHTML = ''
}

