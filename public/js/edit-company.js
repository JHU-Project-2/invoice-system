async function editFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1

    ];

    const response = await fetch(`/api/company/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            company_id: id,
            name,

        }),

        headers: {
            'Content-Type': 'application/json'
        }
    });

    //CONTACT
    //     const response = await fetch(`/api/company/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             company_id: id,
    //             name,
    // 
    //         }),
    // 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });


    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}


document.querySelector('.edit-company-form').addEventListener('submit', editFormHandler);