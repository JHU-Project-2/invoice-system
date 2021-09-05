const form = document.querySelector("#send-email-form");

async function sendEmail(event) {
  event.preventDefault();

  var to = document.getElementById("to");
  var from = document.getElementById("from");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");

  // const data = {
  //     to: to.value,
  //     from: from.value,
  //     subject: subject.value,
  //     text: message.value
  // }

  // console.log(data)

  if (to && from && subject) {
    const response = await fetch("/send", {
      method: "POST",
      body: JSON.stringify({
        to: to.value,
        from: from.value,
        subject: subject.value,
        text: message.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("'Email sent successfully!");
      document.location.reload(`/dashboard/invoice/${id}`);
    } else {
      alert("Error!" + response.statusText + ": Something went wrong 😬");
    }
  }
}

document
  .querySelector("#send-email-form")
  .addEventListener("submit", sendEmail);