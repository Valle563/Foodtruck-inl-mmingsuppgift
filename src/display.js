const menu = document.querySelector('#menu')
const cart = document.querySelector('#cart')
const waiting = document.querySelector('#waiting')
const receipt = document.querySelector('#receipt')

const list = [menu, cart, waiting, receipt]

function hideAllDisplays() {
    // explicitly set display to none so sections don't stack vertically
    list.forEach(item => {
        if (item) item.classList.add('remove-display')
    })
}

export function displaySection(input) {
    hideAllDisplays()
    // const idx = Number(input) || 0
    // const section = list[idx]
    // if (section) section.style.display = ''
    list[input].classList.remove('remove-display')
}

