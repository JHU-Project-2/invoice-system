

async function sendEmail(event) {
    event.preventDefault();

    var senderEmail = document.getElementById('senderEmail').textContent
    var recipientEmail = document.getElementById('recipientEmail').textContent
    var subject = document.getElementById('subject').textContent
    var message = document.getElementById('message').textContent

    console.log(recipientEmail)


    if (senderEmail && recipientEmail) {
        const response = await fetch("/send", {
            method: "POST",
            body: JSON.stringify({
                senderEmail,
                recipientEmail,
                subject,
                message
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace(`/dashboard/company/${company_id}`);

        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector("#send-email-form")
    .addEventListener("submit", sendEmail);
