async function addCompanyForm(event) {
  event.preventDefault();

  const companyName = document.getElementById("company-name").value;

  const contactName = document.querySelector('input[name="contact-name"]').value.trim();
  const contactEmail = document.querySelector('input[name="contact-email"]').value.trim();
  const contactPhone = document.querySelector('input[name="contact-phone"]').value.trim();

  const address1 = document.querySelector('input[name="contact-address-1"]').value.trim();
  const address2 = document.querySelector('input[name="contact-address-2"]').value.trim();
  const city = document.querySelector('input[name="contact-city"]').value.trim();
  const state = document.querySelector('input[name="contact-state"]').value.trim();
  const zipCode = document.querySelector('input[name="contact-zip-code"]').value.trim();

  console.log(companyName)
  const response = await fetch(`/api/company`, {
    method: "POST",
    body: JSON.stringify({
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
  .querySelector("#add-company-form")
  .addEventListener("submit", addCompanyForm);
