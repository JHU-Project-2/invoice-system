


async function addContactFormHandler(event) {
  event.preventDefault();

  const contactName = document.getElementById("contact-name").value;
  const contactEmail = document.getElementById("contact-email").value;
  const contactPhone = document.getElementById("contact-phone").value;

  const company_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (contactName || contactEmail || contactPhone) {
    const response = await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify({
        contactName,
        contactEmail,
        contactPhone,
        company_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector("#comment-form").style.display = "block";
    }
  }
}

document
  .querySelector(".add-contact-form")
  .addEventListener("submit", addContactFormHandler);
