let complaints = [];

function addComplaint() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let type = document.getElementById("type").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || type === "" || message === "") {
        alert("Please fill all details");
        return;
    }

    complaints.push({
        id: "C" + (complaints.length + 1),
        name: name,
        email: email,
        type: type,
        message: message,
        status: "Pending"
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("type").value = "";
    document.getElementById("message").value = "";

    displayComplaints();
}

function displayComplaints() {
    let table = document.getElementById("complaintList");
    table.innerHTML = "";

    complaints.forEach((c, index) => {
        let statusColor =
            c.status === "Accepted" ? "green" :
            c.status === "Sending" ? "orange" : "black";

        let actions = "";

        if (c.status === "Pending") {
            actions = `
                <button class="btn-send" onclick="changeStatus(${index}, 'Sending')">Send</button>
                <button class="btn-accept" onclick="changeStatus(${index}, 'Accepted')">Accept</button>
            `;
        } 
        else if (c.status === "Sending") {
            actions = `
                <button class="btn-accept" onclick="changeStatus(${index}, 'Accepted')">Accept</button>
            `;
        } 
        else {
            actions = `<button class="btn-accept" disabled>Accepted</button>`;
        }

        table.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.type}</td>
                <td>${c.message}</td>
                <td style="color:${statusColor};font-weight:bold">${c.status}</td>
                <td>${actions}</td>
            </tr>
        `;
    });

    document.getElementById("count").innerText = complaints.length;
}

function changeStatus(index, status) {
    complaints[index].status = status;

    if (status === "Accepted") {
        alert("Your complaint has been ACCEPTED. We will resolve it soon.");
    }

    displayComplaints();
}
