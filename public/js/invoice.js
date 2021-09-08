let ppu = document.querySelectorAll('.ppu')
let units = document.querySelectorAll('.units')
let row = document.querySelectorAll('.line-item')
let totalEl = document.querySelectorAll('.total')
let invoiceTotal = document.querySelector('.invoice-total')
let lineTotal;
let totalArray = [];

let deleteBtn = document.querySelector('.delete-item-btn')


function getTotal() {
    // get each line total 
    for (var i = 0; i < row.length; i++) {
        lineTotal = ppu[i].innerHTML * units[i].innerHTML
        totalEl[i].append(lineTotal)
        console.log("Line Total: ", lineTotal)
        // push to array of line totals for addition of invoice total
        totalArray.push(lineTotal)
    }
    // add all line totals and append to invoice
    totalSum = totalArray.reduce((a, b) => a + b, 0)
    invoiceTotal.append(totalSum)
    console.log("Invoice Total: ", totalSum)
}

// works but can only delete the first item
async function deleteItem(itemId) {

    console.log("item id: ", itemId)
    const response = await fetch(`/api/item/${itemId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            itemId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        // document.location.replace(`/dashboard/invoice/${invoice_id}`);
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

getTotal()

document.querySelector("#invoice-table").addEventListener('click', event => {
    if (event.target.classList.contains('delete-item-btn')) {
        event.preventDefault();
        let itemId = event.target.getAttribute("data-item-id")
        deleteItem(itemId)
    }
})

