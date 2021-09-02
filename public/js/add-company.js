async function addCompanyForm(event) {
  event.preventDefault();

  const name = document.getElementById("company-name").value;

  const response = await fetch(`/api/company`, {
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
  .querySelector("#add-company-form")
  .addEventListener("submit", addCompanyForm);
