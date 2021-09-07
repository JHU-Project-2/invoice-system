let ppu = document.querySelectorAll('.ppu')
let units = document.querySelectorAll('.units')
let row = document.querySelectorAll('.line-item')
let totalEl = document.querySelectorAll('.total')
let invoiceTotal = document.querySelector('.invoice-total')
let lineTotal;
let totalArray = [];

function getTotal() {
    // get each line total 
    for (var i = 0; i < row.length; i++) {
        lineTotal = ppu[i].innerHTML * units[i].innerHTML
        totalEl[i].append(lineTotal)
        console.log(lineTotal)

        totalArray.push(lineTotal)
    }
    // add all line totals and append to invoice
    totalSum = totalArray.reduce((a, b) => a + b, 0)
    invoiceTotal.append(totalSum)

}




getTotal()