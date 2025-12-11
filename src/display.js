const menu = document.querySelector('#menu')
const cart = document.querySelector('#cart')
const waiting = document.querySelector('#waiting')
const receipt = document.querySelector('#receipt')

const list = [menu, cart, waiting, receipt]
function hideAllDisplays() {

    list.forEach(item => { 
        item.classList.add('remove-display')
    })
}

export function displaySection(input) {
    hideAllDisplays()

    list[input].classList.remove('remove-display')

}

