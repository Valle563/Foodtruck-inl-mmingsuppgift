import { state } from "../state.js"
// get API key
const url ='https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'
export async function getApiKey() {
    const res = await fetch(`${url}/keys`, {
        method: 'POST'
    })    
    const data = await res.json()
    state.apiKey = data.key
    console.log('this is the API key', state.apiKey)
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
            console.log('this is the tenantId',state.tenantId)
            
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
            console.log('this is menu', response)
            const data = await response.json()
            console.log(data)
            state.menu = data.items
            console.log('this is state.menu', state.menu)

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
            state.eta = data.order.eta
            state.timestamp = data.order.timestamp
            console.log(data)
            console.log('this is the orderId',state.orderId)

        }catch (error){
            console.error(error.message)    
    }
}
export async function getApiRecipt() {
    try {
        const response = await fetch(`${url}/${state.tenantName}/receipts/${state.orderId}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': state.apiKey,
                'Content-Type': 'application/json'
            },
            })  
            const data = await response.json()
            console.log('this is the receipt',data)

        }catch (error){
            console.error(error.message)    
    }
}



