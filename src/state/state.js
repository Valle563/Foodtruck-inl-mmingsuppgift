
// Global state object shared across all modules and this will share its data
export const state = {
    menu: [], 
    cart: [], 
    order: [], 
    receipt: [],
    apiKey: '',
    tenantId: '',
    tenantName: '',
    orderId: '',
    eta: '',
    timestamp: '',
    totalPrice: 0,
    receiptId: '',
    receiptItems: [],
    receiptPrice: '',
}

export function updateTotalPrice() {
    const subtotal = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const moms = Math.round(subtotal * 0.20)
    state.totalPrice = subtotal + moms
}


