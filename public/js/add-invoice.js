async function addInvoiceFormHandler(event) {
  event.preventDefault();

  // const isPaid = document.getElementById("isPaid");
  const due_date = document.querySelector('input[name="due-date"]').value.trim();
  const name = document.querySelector('input[name="name"]').value.trim();

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
      name,
      project_id

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
