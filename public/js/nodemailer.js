const form = document.querySelector("#send-email-form");
let invoiceData = []


function formatEmail() {
  // get html data from invoice
  let htmlData = document.querySelector('.email-content').innerHTML



  invoiceData.push(htmlData)

}

async function sendEmail(event) {
  event.preventDefault();


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
        html: invoiceData


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

formatEmail()



document
  .querySelector("#send-email-form")
  .addEventListener("submit", sendEmail);




