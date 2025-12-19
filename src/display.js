const menu = document.querySelector('#menu')
const cart = document.querySelector('#cart')
const waiting = document.querySelector('#waiting')
const receipt = document.querySelector('#receipt')

const list = [menu, cart, waiting, receipt]

// function hideAllDisplays() {
//     // explicitly set display to none so sections don't stack vertically
//     list.forEach(item => {
//         if (item) 
//             item.classList.add('remove-display')
//             // item.style.display = ''

//     })
// }

// export function displaySection(input) {
//     hideAllDisplays()
//     // list[input].classList.remove('remove-display')
//     const section = list[input]
//     if (!section) return
//     section.classList.remove('remove-display')

//     if (section.id === 'receipt') {
//         section.style.display = 'flex'
//     } else {
//         section.style.display = ''
//     }
// }


function hideAllDisplays() {
    list.forEach(item => {
        if (item) item.classList.add('remove-display')
    })
}

export function displaySection(input) {
    hideAllDisplays()
    const section = list[input]
    if (!section) return
    section.classList.remove('remove-display')
}