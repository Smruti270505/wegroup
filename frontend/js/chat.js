const socket =
    io("http://localhost:5000");

// SEND MESSAGE

function sendMessage() {

    let input =
        document.getElementById(
            "messageInput"
        );

    let message =
        input.value.trim();

    if (!message) return;

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );

    socket.emit(

        "sendMessage",

        {

            username:
                currentUser.name,

            message
        }
    );

    input.value = "";
}

// RECEIVE MESSAGE

socket.on(

    "receiveMessage",

    (data) => {

        let messages =
            document.getElementById(
                "messages"
            );

        messages.innerHTML += `

            <div class="message">

                <strong>

                    ${data.username}

                </strong>

                : ${data.message}

            </div>
        `;
    }
);