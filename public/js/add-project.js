


async function addProjectFormHandler(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const price = document.getElementById("price").value;
    const due_date = document.getElementById("due-date").value;

    const company_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    if (title) {
        const response = await fetch("/api/contacts", {
            method: "POST",
            body: JSON.stringify({
                title,
                type,
                price,
                due_date,
                company_id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
            document.querySelector("#comment-form").style.display = "block";
        }
    }
}

document
    .querySelector(".add-project-form")
    .addEventListener("submit", addProjectFormHandler);
