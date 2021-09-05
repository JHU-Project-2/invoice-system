let ppu = document.querySelector('.ppu').innerHTML
let units = document.querySelector('.units').innerHTML
let totalEl = document.querySelector('.total')


function init() {
    let lineTotal = ppu * units
    console.log(lineTotal)
    totalEl.append(lineTotal)
}


init()