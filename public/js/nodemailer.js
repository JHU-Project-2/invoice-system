const form = document.querySelector("#send-email-form");
let invoiceData = []

const invoice_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];


async function sendEmail(event) {
  event.preventDefault();

  let htmlData = document.querySelector('.email-content').innerHTML

  invoiceData.push(htmlData)

  var to = document.getElementById("to");
  var from = document.getElementById("from");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");

  if (to && from && subject) {
    const response = await fetch("/mail/send", {
      method: "POST",
      body: JSON.stringify({
        to: to.value,
        from: from.value,
        subject: subject.value,
        text: message.value,
        html: invoiceData,
        invoice_id


      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("'Email sent successfully!");
      // document.location.reload(`/dashboard/invoice/${id}`);
    } else {
      alert("Error!" + response.statusText + ": Something went wrong 😬");
    }
  }
}





document
  .querySelector("#send-email-form")
  .addEventListener("submit", sendEmail);




