import { 
    getApiKey, 
    getApiTenant, 
    getApiMenu,
} from './api/api.js'
import { state } from './state/state.js'
import { displaySection } from './display.js'

async function init() {

    console.log('API KEY:', state.apiKey)

    await getApiKey()
    await getApiTenant()
    await getApiMenu()

    displaySection('0')
}

init()