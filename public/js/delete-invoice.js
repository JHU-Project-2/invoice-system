

async function deleteInvoiceHandler(event) {
    event.preventDefault();

    const invoice_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    console.log(invoice_id)
    const response = await fetch(`/api/invoice/${invoice_id}`, {

        method: 'DELETE',
        body: JSON.stringify({
            id: invoice_id
        }),
        headers: {
            'Content-Type': 'application/json'

        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.delete-invoice-btn').addEventListener('click', deleteInvoiceHandler);