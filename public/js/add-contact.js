async function addContactForm(event) {
  event.preventDefault();

  const contactName = document.getElementById("contact-name").value;
  const contactEmail = document.getElementById("contact-email").value;
  const contactPhone = document.getElementById("contact-phone").value;

  const response = await fetch(`/api/contact`, {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#add-contact-form")
  .addEventListener("submit", addContactForm);
