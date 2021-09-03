
async function deleteProjectHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute("data-project-id")


    const response = await fetch(`/api/project/${id}`, {

        method: 'DELETE',
        body: JSON.stringify({
            project_id: id
        }),
        headers: {
            'Content-Type': 'application/json'

        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.delete-project-btn').addEventListener('click', deleteProjectHandler);