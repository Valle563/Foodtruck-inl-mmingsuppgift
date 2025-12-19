import { state } from "../state/state.js"
// get API key
const url ='https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'
export async function getApiKey() {
    const res = await fetch(`${url}/keys`, {
        method: 'POST'
    })    
    const data = await res.json()
    state.apiKey = data.key
}

// create tenat
export async function getApiTenant() {
    try {
        const response = await fetch(`${url}/tenants`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': state.apiKey,
                'Content-Type': 'application/json'
            },    
                body: JSON.stringify({
                    name: `test-user1${Date.now()}`
                })
            })  
            const data = await response.json()
            state.tenantId = data.id
            state.tenantName = data.name
            
        }catch (error){
            console.error(error.message)    
    }
}

export async function getApiMenu() {
    try {
        const response = await fetch(`${url}/menu`, {
            headers: {
                'accept': 'application/json',
                'x-zocom': state.apiKey,
                'Content-Type': 'application/json'
            },
        })  
            
            const data = await response.json()
            
            state.menu = data.items
            

        }catch (error){
            console.error(error.message)    
    }
}

export async function getApiOrderInfo() {
    try {
        const response = await fetch(`${url}/${state.tenantName}/orders`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': state.apiKey,
                'Content-Type': 'application/json'
            },    
                body: JSON.stringify({
                    items: state.order
                })
            })  
            const data = await response.json()
            state.orderId = data.order.id
            state.eta = Date.parse(data.order.eta)
            state.timestamp = Date.parse(data.order.timestamp)

        }catch (error){
            console.error(error.message)    
    }
}
export async function getApiReceipt() {
    try {
        const response = await fetch(`${url}/receipts/${state.orderId}`, {
            headers: {
                'accept': 'application/json',
                'x-zocom': state.apiKey,
                'Content-Type': 'application/json'
                }
            })  
            const data = await response.json()
            state.receiptId = data.receipt.id
            state.receiptItems = data.receipt.items
            state.receiptPrice = data.receipt.orderValue 
        }catch (error){
            console.error(error.message)    
    }
}


