// get API key
export async function getApiKey() {
    const res = await fetch('"https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    })    
    const data = await res.json()
    return data.key //return API key
}

// create tenat
export async function createTenant(apiKey, name) {
    const bodyToSent = { name }
    const res = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-zocom': apiKey
            },
            body: JSON.stringify(bodyToSent)
    })
    return await res.json() // return tenant info
}