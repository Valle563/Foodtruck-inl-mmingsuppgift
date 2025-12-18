import { state } from '../state/state.js'
import { drinkButtons, dipButtons, initMenuCartButton, wontonButtons } from './menuButtons.js'
export function renderMenu() {
    const menuSection = document.querySelector('#menu')
    menuSection.innerHTML = '' 
    
    // Cart icon container
    const cartIconContainer = document.createElement('div')
    cartIconContainer.className = 'cart-icon-container'
    
    const cartBtn = document.createElement('button')
    cartBtn.className = 'cart-btn'
    cartBtn.id = 'cart-btn-menu'
    // use external SVG file for the cart icon so it's easier to update
    cartBtn.innerHTML = `<img class="cart-icon-img" src="./assets/images/cart.svg" alt="cart">`
    
    if (state.cart.length > 0) {
        const badge = document.createElement('span')
        badge.className = 'cart-badge'
        badge.textContent = state.cart.length
        cartBtn.appendChild(badge)
    }

    cartIconContainer.appendChild(cartBtn)
    
    
    // Menu title
    const menuTitle = document.createElement('h1')
    menuTitle.className = 'menu-title'
    menuTitle.textContent = 'MENY'
    
    // Menu container
    const menuContainer = document.createElement('div')
    menuContainer.className = 'menu-container'
    
    // Wontons section
    const wontonsSection = renderWontons()
    
    // Dips section
    const dipsSection = renderDipsSection()
    
    // Drinks section
    const drinksSection = renderDrinksSection()
    
    menuContainer.appendChild(wontonsSection)
    menuContainer.appendChild(dipsSection)
    menuContainer.appendChild(drinksSection)
    
    menuSection.appendChild(cartIconContainer)
    menuSection.appendChild(menuTitle)
    menuSection.appendChild(menuContainer)
    initMenuCartButton()
}

function renderWontons() {
    const wontonsSection = document.createElement('div')
    wontonsSection.className = 'wontons-section'
    
    const wontons = state.menu.filter(item => item.type === 'wonton')
    
    wontons.forEach(wonton => {
        const wontonItem = document.createElement('div')
        wontonItem.className = 'wonton-item'
        wontonItem.dataset.id = wonton.id
        wontonButtons(wontonItem)

        const wontonHeader = document.createElement('div')
        wontonHeader.className = 'wonton-header'
        
        const wontonName = document.createElement('h3')
        wontonName.className = 'wonton-name'
        wontonName.textContent = wonton.name

        const wontonDots = document.createElement('span')
        wontonDots.className = 'dotted-line'
        
        const wontonPrice = document.createElement('span')
        wontonPrice.className = 'wonton-price'
        wontonPrice.textContent = `${wonton.price} SEK`
        
        wontonHeader.append(wontonName, wontonDots, wontonPrice)
        
        const wontonIngredients = document.createElement('p')
        wontonIngredients.className = 'wonton-ingredients'
        wontonIngredients.textContent = wonton.ingredients.join(', ')
        
        const wontonLine = document.createElement('div')
        wontonLine.className = 'wonton-line'
        
        wontonItem.append(wontonHeader, wontonIngredients, wontonLine)
        
        
        wontonsSection.appendChild(wontonItem)
    })
    
    return wontonsSection
}

function renderDipsSection() {
    const dipsSection = document.createElement('div')
    dipsSection.className = 'dips-section'
    
    const sectionTitle = document.createElement('h2')
    sectionTitle.className = 'section-title'
    sectionTitle.innerHTML = 'DIPSÅS <span class="price">19 SEK</span>'
    
    const dipsGrid = document.createElement('div')
    dipsGrid.className = 'dips-grid'
    
    const dips = state.menu.filter(item => item.type === 'dip')
    
    dips.forEach(dip => {
        const dipBtn = document.createElement('button')
        dipBtn.className = 'menu-btn dip-btn'
        dipBtn.dataset.id = dip.id
        dipBtn.textContent = dip.name
        dipsGrid.appendChild(dipBtn)
        dipButtons(dipBtn)
    })
    
    dipsSection.appendChild(sectionTitle)
    dipsSection.appendChild(dipsGrid)
    
    return dipsSection
}

function renderDrinksSection() {
    const drinksSection = document.createElement('div')
    drinksSection.className = 'drinks-section'
    
    const sectionTitle = document.createElement('h2')
    sectionTitle.className = 'section-title'
    sectionTitle.innerHTML = 'DRICKA <span class="price">19 SEK</span>'
    
    const drinksGrid = document.createElement('div')
    drinksGrid.className = 'drinks-grid'
    
    const drinks = state.menu.filter(item => item.type === 'drink')
    
    drinks.forEach(drink => {
        const drinkBtn = document.createElement('button')
        drinkBtn.className = 'menu-btn drink-btn'
        drinkBtn.dataset.id = drink.id
        drinkBtn.textContent = drink.name
        drinksGrid.appendChild(drinkBtn)
        drinkButtons(drinkBtn)
    })
    
    drinksSection.appendChild(sectionTitle)
    drinksSection.appendChild(drinksGrid)
    
    return drinksSection
}
