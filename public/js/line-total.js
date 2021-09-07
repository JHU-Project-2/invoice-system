let ppu = document.querySelector('.ppu').innerHTML
let units = document.querySelector('.units').innerHTML
let row = document.querySelectorAll('.line-item')
let totalEl = document.querySelectorAll('.total')

// console.log(totalEl)



function init() {
    // each line total 
    for (var i = 0; i < row.length; i++) {
        let lineTotal = ppu * units
        totalEl[i].append(lineTotal)
        // totalEl.append(lineTotal)
        // console.log(lineTotal)
    }


}


init()