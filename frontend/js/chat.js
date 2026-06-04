const socket =
    io("http://localhost:5000");
    let currentUser =

    JSON.parse(

        localStorage.getItem(

            "currentUser"

        ) || "{}"
    );

// REGISTER USER

socket.emit(

    "userOnline",

    currentUser.name
);

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
socket.on(

    "onlineUsers",

    (users) => {

        let container =

            document.getElementById(

                "onlineUsers"
            );

        container.innerHTML = "";

        users.forEach(

            function(user) {

                container.innerHTML += `

                    <div>

                        🟢 ${user}

                    </div>
                `;
            }
        );
    }
);
let messageInput =

    document.getElementById(

        "messageInput"
    );

messageInput.addEventListener(

    "input",

    () => {

        socket.emit(

            "typing",

            currentUser.name
        );
    }
);
socket.on(

    "userTyping",

    (username) => {

        let indicator =

            document.getElementById(

                "typingIndicator"
            );

        indicator.innerText =

            `${username} is typing...`;

        setTimeout(

            () => {

                indicator.innerText = "";

            },

            2000
        );
    }
);