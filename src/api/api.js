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
export async function createTenant() {
    try {
        // const bodyToSent = { name }
        console.log(`URL: ${url}/tenants\napi key: ${state.apiKey}\nname: ${`test-user1${Date.now()}`}` )
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
            console.log('this is the tenant', response)
            const data = await response.json()
            console.log(data)

            }catch (error){
                console.error(error.message)    
            }
            

    // return await res.json() // return tenant info
}