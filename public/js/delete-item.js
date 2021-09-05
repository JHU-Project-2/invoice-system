
async function deleteItemHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute("data-item-id")


    const response = await fetch(`/api/item/${id}`, {

        method: 'DELETE',
        body: JSON.stringify({
            item_id: id
        }),
        headers: {
            'Content-Type': 'application/json'

        }
    });

    if (response.ok) {
        document.location.replace(`/dashboard/invoice/${invoice_id}`);
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.delete-item-btn').addEventListener('click', deleteItemHandler);