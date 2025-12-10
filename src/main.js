import { 
    getApiKey, 
    getApiTenant, 
    getApiMenu,
    getApiOrderInfo,
    getApiRecipt
} from './api/api.js'
import { state } from './state.js'


async function init() {

    console.log('API KEY:', state.apiKey)

    await getApiKey()
    await getApiTenant()
    await getApiMenu()
    await getApiOrderInfo()
    await getApiRecipt()
}

init()