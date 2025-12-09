import { getApiKey, createTenant} from './api.js'
import { state } from './state.js'

async function init() {

    // Get api key
    // state.apiKey = await getApiKey() {

    // }

    //
    console.log('API KEY:', state.apiKey)

    // create tenant
    // state.tenant = await createTenant(state.apiKey, 'Valentino')
    // console.log('TENANT:', state.tenant)

    await getApiKey()
    await createTenant()
}

init()