import { state } from '../state/state.js'
import { initReceiptButtons } from './receiptButtons.js'
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
    const logoImg = document.createElement('img')
    logoImg.src = './assets/images/logo.png'
    logoImg.alt = 'Yum Yum Gim Mi Sum logo'
    logoImg.className = 'receipt-logo-img'

    receiptLogo.appendChild(logoImg)
    
    
    // Receipt title
    const title = document.createElement('h2')
    title.className = 'receipt-title'
    title.textContent = 'KVITTO'
    
    // Receipt ID
    const receiptId = document.createElement('p')
    receiptId.className = 'receipt-id'
    receiptId.textContent = state.orderId
    ? `#${state.orderId.toUpperCase()}`
    : '#----'
    
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

    
    // document.querySelectorAll('section').forEach(sec => {
    //     if(sec.id !== 'receipt') {
    //         sec.classList.add('remove-display')
    //     }
    // })
    
    // receiptSection.classList.remove('remove-display')
    initReceiptButtons()
    
}


function createReceiptItems() {
    const itemsContainer = document.createElement('div')
    itemsContainer.className = 'receipt-items'

    state.cart.forEach(item => {
        const itemRow = document.createElement('div')
        itemRow.className = 'receipt-item-row'

        const itemName = document.createElement('div')
        itemName.className = 'receipt-item-name'

        const nameSpan = document.createElement('span')
        nameSpan.textContent = item.name.toUpperCase()

        const quantitySpan = document.createElement('span')
        quantitySpan.className = 'receipt-item-quantity'
        quantitySpan.textContent =
            item.quantity === 1
                ? '1 styck'
                : `${item.quantity} stycken`

        itemName.append(nameSpan, quantitySpan)

        const itemPrice = document.createElement('span')
        itemPrice.className = 'receipt-item-price'
        itemPrice.textContent = `${item.price * item.quantity} SEK`

        itemRow.append(itemName, itemPrice)

        const dots = document.createElement('div')
        dots.className = 'receipt-item-dots'

        itemsContainer.append(itemRow, dots)
    })

    return itemsContainer
}
    
    // Object.values(itemCounts).forEach(item => {
    //     const itemRow = document.createElement('div')
    //     itemRow.className = 'receipt-item-row'
        
    //     const itemName = document.createElement('div')
    //     itemName.className = 'receipt-item-name'
        
    //     const nameSpan = document.createElement('span')
    //     nameSpan.textContent = item.name
        
    //     const quantitySpan = document.createElement('span')
    //     quantitySpan.className = 'receipt-item-quantity'
    //     quantitySpan.textContent = `${item.quantity} stycken`
        
    //     itemName.appendChild(nameSpan)
    //     itemName.appendChild(quantitySpan)
        
    //     const itemPrice = document.createElement('span')
    //     itemPrice.className = 'receipt-item-price'
    //     itemPrice.textContent = `${item.totalPrice} SEK`
        
    //     itemRow.appendChild(itemName)
    //     itemRow.appendChild(itemPrice)
        
    //     const itemDots = document.createElement('div')
    //     itemDots.className = 'receipt-item-dots'
        
    //     itemsContainer.appendChild(itemRow)
    //     itemsContainer.appendChild(itemDots)
    // })
    
    // return itemsContainer



function createReceiptTotal() {
    // const subtotal = state.receiptPrice
    // const moms = Math.round(subtotal * 0.20)
    const total = state.totalPrice
    
    
    const totalContainer = document.createElement('div')
    totalContainer.className = 'receipt-total'
    
    const totalRow = document.createElement('div')
    totalRow.className = 'receipt-total-row'
    
    const totalLabel = document.createElement('span')
    totalLabel.textContent = 'TOTALT'
    
    const totalAmount = document.createElement('span')
    totalAmount.textContent = `${total} SEK`
    
    totalRow.appendChild(totalLabel)
    totalRow.appendChild(totalAmount)
    
    const momsText = document.createElement('p')
    momsText.className = 'receipt-moms'
    momsText.textContent = 'inkl 20% moms'
    
    totalContainer.appendChild(totalRow)
    totalContainer.appendChild(momsText)
    
    return totalContainer
}