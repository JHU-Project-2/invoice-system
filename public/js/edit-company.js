async function editFormHandler(event) {
    event.preventDefault();

    const companyName = document.querySelector('input[name="company-name"]').value.trim();

    const contactName = document.querySelector('input[name="contact-name"]').value.trim();
    const contactEmail = document.querySelector('input[name="contact-email"]').value.trim();
    const contactPhone = document.querySelector('input[name="contact-phone"]').value.trim();

    const address1 = document.querySelector('input[name="contact-address-1"]').value.trim();
    const address2 = document.querySelector('input[name="contact-address-2"]').value.trim();
    const city = document.querySelector('input[name="contact-city"]').value.trim();
    const state = document.querySelector('input[name="contact-state"]').value.trim();
    const zipCode = document.querySelector('input[name="contact-zip-code"]').value.trim();


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1

    ];

    const response = await fetch(`/api/company/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            companyName,
            contactName,
            contactEmail,
            contactPhone,
            address1,
            address2,
            city,
            state,
            zipCode,

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


document.querySelector('.edit-company-form').addEventListener('submit', editFormHandler);