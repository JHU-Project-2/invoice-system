async function hideArchivedInvoice(event) {
    event.preventDefault();

    const project_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    console.log(invoice_id)
    const response = await fetch(`/api/invoice/${project_id}`, {

        method: 'GET',
        body: JSON.stringify({
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (archived = true) {
        console.log('TRUEEEEEE')
    }

    if (response.ok) {

        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}


// get all invoices in the project and check archived boolean
// if true, hide