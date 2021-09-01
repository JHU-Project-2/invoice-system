async function newCompanyForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const contactName = document.getElementById("company-contact-name").value;

  const response = await fetch(`/api/company`, {
    method: "POST",
    body: JSON.stringify({
      name,
      contactName,
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
  .querySelector("#new-company-form")
  .addEventListener("submit", newCompanyForm);
