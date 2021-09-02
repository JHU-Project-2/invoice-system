
async function deleteCompanyHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

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