// declare send email form
const form = document.querySelector("#send-email-form");
// create empty array to add HTML from invoice page
let invoiceData = [];
// get the invoice ID via the web address bar
const invoice_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

function hideButtons() {
  //  grab all buttons
  let buttons = document.getElementsByTagName("button");
  // console.log(buttons.length)

  // hide all buttons except those in the modal
  for (var i = 0; i < 9; i++) {
    buttons[i].classList.add("hide");
  }
}
async function sendEmail(event) {
  event.preventDefault();
  // declaring each invoice element for the email
  // let htmlData = document.querySelector('.email-content').innerHTML
  let billingHeader = document.querySelector(".billing-header");
  let billingBody = document.querySelector(".billing-body");
  let invoiceHeader = document.querySelector(".invoice-header");
  let invoiceBody = document.querySelector(".invoice-body");
  let entireTable = document.querySelector("#invoice-table");
  let tableHeader = document.querySelector(".table-header");

  invoiceData.push(
    billingHeader.innerHTML +
    billingBody.innerHTML +
    invoiceHeader.innerHTML +
    entireTable.innerHTML
  );

  var to = document.getElementById("to").value;
  var from = document.getElementById("from").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  if (to && from && subject) {
    const response = await fetch("/mail/send", {
      method: "POST",
      body: JSON.stringify({
        to,
        from,
        subject,
        message,
        invoiceData,
        invoice_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("'Email sent successfully!");
      document.location.reload(`/dashboard/invoice/${invoice_id}`);
    } else {
      alert("Error!" + response.statusText + ": Something went wrong 😬");
    }
  }
}

function exportPDF() {
  hideButtons(), window.print();
}

document
  .querySelector("#send-email-form")
  .addEventListener("submit", sendEmail);
document.querySelector(".export-pdf").addEventListener("click", exportPDF);
