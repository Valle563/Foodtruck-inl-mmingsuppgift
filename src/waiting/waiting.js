import { state } from '../state/state.js'

export function renderWaiting() {
    const waitingSection = document.querySelector('#waiting')
    waitingSection.innerHTML = '' // Töm först
    
    const waitingContainer = document.createElement('div')
    waitingContainer.className = 'waiting-container'
    
    // Waiting box
    const waitingBox = document.createElement('div')
    waitingBox.className = 'waiting-box'
    
    const wontonBox = document.createElement('div')
    wontonBox.className = 'wonton-box'
    
    const logoBadge = document.createElement('div')
    logoBadge.className = 'logo-badge'
    
    const logoText = document.createElement('span')
    logoText.className = 'logo-text'
    logoText.innerHTML = 'Y Y<br>G S'
    
    logoBadge.appendChild(logoText)
    wontonBox.appendChild(logoBadge)
    waitingBox.appendChild(wontonBox)
    
    // Title
    const title = document.createElement('h2')
    title.className = 'waiting-title'
    title.innerHTML = 'DINA WONTONS<br>TILLAGAS!'
    
    // ETA
    const eta = document.createElement('p')
    eta.className = 'waiting-eta'
    eta.textContent = `ETA ${state.eta} MIN`
    
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
    
    waitingContainer.appendChild(waitingBox)
    waitingContainer.appendChild(title)
    waitingContainer.appendChild(eta)
    waitingContainer.appendChild(orderId)
    waitingContainer.appendChild(receiptBtn)
    waitingContainer.appendChild(newOrderBtn)
    
    waitingSection.appendChild(waitingContainer)
}