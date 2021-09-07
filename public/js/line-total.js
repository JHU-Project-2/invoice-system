let ppu = document.querySelectorAll('.ppu')
let units = document.querySelectorAll('.units')
let row = document.querySelectorAll('.line-item')
let totalEl = document.querySelectorAll('.total')





function init() {
    // each line total 
    for (var i = 0; i < row.length; i++) {
        let lineTotal = ppu[i].innerHTML * units[i].innerHTML
        totalEl[i].append(lineTotal)
        // totalEl.append(lineTotal)
        // console.log(lineTotal)
    }


}


init()