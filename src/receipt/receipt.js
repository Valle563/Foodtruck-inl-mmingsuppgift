import { state } from '../state/state.js'

export function renderReceipt() {
    const receiptSection = document.querySelector('#receipt')
    receiptSection.innerHTML = '' // Töm först
    
    const receiptContainer = document.createElement('div')
    receiptContainer.className = 'receipt-container'
    
    // Receipt paper
    const receiptPaper = document.createElement('div')
    receiptPaper.className = 'receipt-paper'
    
    // Receipt logo
    const receiptLogo = document.createElement('div')
    receiptLogo.className = 'receipt-logo'
    receiptLogo.innerHTML = `<img class="receipt-logo-img" src="assets/images/logo.png" alt="logo img">` 
    
    const logoBadge = document.createElement('div')
    logoBadge.className = 'receipt-logo-badge'
    
    const logoText = document.createElement('span')
    logoText.className = 'receipt-logo-text'
    logoText.innerHTML = 'Y Y<br>G S'
    
    logoBadge.appendChild(logoText)
    receiptLogo.appendChild(logoBadge)
    
    // Receipt title
    const title = document.createElement('h2')
    title.className = 'receipt-title'
    title.textContent = 'KVITTO'
    
    // Receipt ID
    const receiptId = document.createElement('p')
    receiptId.className = 'receipt-id'
    receiptId.textContent = `#${state.receiptId.toUpperCase()}`
    
    // Receipt items
    const receiptItems = createReceiptItems()
    
    // Receipt total
    const receiptTotal = createReceiptTotal()
    
    receiptPaper.appendChild(receiptLogo)
    receiptPaper.appendChild(title)
    receiptPaper.appendChild(receiptId)
    receiptPaper.appendChild(receiptItems)
    receiptPaper.appendChild(receiptTotal)
    
    // New order button
    const newOrderBtn = document.createElement('button')
    newOrderBtn.className = 'receipt-new-order-btn'
    newOrderBtn.id = 'receipt-new-order-btn'
    newOrderBtn.textContent = 'GÖR EN NY BESTÄLLNING'
    
    receiptContainer.appendChild(receiptPaper)
    receiptContainer.appendChild(newOrderBtn)
    
    receiptSection.appendChild(receiptContainer)
}

function createReceiptItems() {
    const itemsContainer = document.createElement('div')
    itemsContainer.className = 'receipt-items'
    
    const itemCounts = {}
    
    state.receiptItems.forEach(item => {
        if (itemCounts[item.name]) {
            itemCounts[item.name].quantity++
            itemCounts[item.name].totalPrice += item.price
        } else {
            itemCounts[item.name] = {
                name: item.name,
                quantity: 1,
                price: item.price,
                totalPrice: item.price
            }
        }
    })
    
    Object.values(itemCounts).forEach(item => {
        const itemRow = document.createElement('div')
        itemRow.className = 'receipt-item-row'
        
        const itemName = document.createElement('div')
        itemName.className = 'receipt-item-name'
        
        const nameSpan = document.createElement('span')
        nameSpan.textContent = item.name
        
        const quantitySpan = document.createElement('span')
        quantitySpan.className = 'receipt-item-quantity'
        quantitySpan.textContent = `${item.quantity} stycken`
        
        itemName.appendChild(nameSpan)
        itemName.appendChild(quantitySpan)
        
        const itemPrice = document.createElement('span')
        itemPrice.className = 'receipt-item-price'
        itemPrice.textContent = `${item.totalPrice} SEK`
        
        itemRow.appendChild(itemName)
        itemRow.appendChild(itemPrice)
        
        const itemDots = document.createElement('div')
        itemDots.className = 'receipt-item-dots'
        
        itemsContainer.appendChild(itemRow)
        itemsContainer.appendChild(itemDots)
    })
    
    return itemsContainer
}

function createReceiptTotal() {
    const subtotal = state.receiptPrice
    const moms = Math.round(subtotal * 0.20)
    
    const totalContainer = document.createElement('div')
    totalContainer.className = 'receipt-total'
    
    const totalRow = document.createElement('div')
    totalRow.className = 'receipt-total-row'
    
    const totalLabel = document.createElement('span')
    totalLabel.textContent = 'TOTALT'
    
    const totalAmount = document.createElement('span')
    totalAmount.textContent = `${subtotal + moms} SEK`
    
    totalRow.appendChild(totalLabel)
    totalRow.appendChild(totalAmount)
    
    const momsText = document.createElement('p')
    momsText.className = 'receipt-moms'
    momsText.textContent = 'inkl 20% moms'
    
    totalContainer.appendChild(totalRow)
    totalContainer.appendChild(momsText)
    
    return totalContainer
}