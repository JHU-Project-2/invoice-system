async function addInvoiceFormHandler(event) {
  event.preventDefault();

  // const isPaid = document.getElementById("isPaid");
  const due_date = document.querySelector('input[name="due-date"]').value.trim();
  const address_1 = document.querySelector('input[name="billing-address-1"]').value.trim();
  const address_2 = document.querySelector('input[name="billing-address-2"]').value.trim();
  const city = document.querySelector('input[name="city"]').value.trim();
  const state = document.querySelector('input[name="state"]').value.trim();
  const zipCode = document.querySelector('input[name="zip-code"]').value.trim();
  const companyName = document.querySelector('input[name="company-name"]').value.trim();
  const invoiceName = document.querySelector('input[name="invoice-name"]').value.trim();


  const project_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];


  // check if checkbox is checked and return true or false
  // 
  //   if (document.getElementById("isPaid").checked = true) {
  //     isPaid = "true"
  //   } else {
  //     isPaid = "false"
  //   }



  // console.log(isPaid)

  const response = await fetch(`/api/invoice`, {
    method: "POST",
    body: JSON.stringify({
      // isPaid,
      due_date,
      project_id,
      companyName,
      address_1,
      address_2,
      city,
      state,
      zipCode,
      invoiceName
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (response.ok) {
    document.location.replace(`/dashboard/project/${project_id}`);

  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#add-invoice-form")
  .addEventListener("submit", addInvoiceFormHandler);
