let ppu = document.querySelectorAll('.ppu')
let units = document.querySelectorAll('.units')
let row = document.querySelectorAll('.line-item')
let totalEl = document.querySelectorAll('.total')
let invoiceTotal = document.querySelector('.invoice-total')
let lineTotal;
let totalArray = [];
let deleteBtn = document.querySelector('.delete-item-btn')


const invoice_id = window.location.toString().split("/")[
    window.location.toString().split("/").length + 1
];




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




async function deleteItem(event) {
    event.preventDefault();
    const itemId = event.target.getAttribute("data-item-id")
    console.log(itemId)

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

deleteBtn.addEventListener('click', deleteItem)