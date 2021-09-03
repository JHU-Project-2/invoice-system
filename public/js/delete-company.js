
async function deleteCompanyHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute("data-company-id")


    const response = await fetch(`/api/company/${id}`, {

        method: 'DELETE',
        body: JSON.stringify({
            company_id: id
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

document.querySelector('.delete-company-btn').addEventListener('click', deleteCompanyHandler);