async function addItemFormHandler(event) {
  event.preventDefault();

  const description = document.querySelector('input[name="description"]').value.trim();
  const quantity = document.querySelector('input[name="quantity"]').value.trim();
  const ppu = document.querySelector('input[name="ppu"]').value.trim();

  const invoice_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];


  const response = await fetch(`/api/item`, {
    method: "POST",
    body: JSON.stringify({
      // isPaid,
      invoice_id,
      description,
      quantity,
      ppu

    }),
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (response.ok) {
    document.location.replace(`/dashboard/invoice/${invoice_id}`);
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#add-item-form")
  .addEventListener("submit", addItemFormHandler);
