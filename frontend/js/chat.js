const socket =
    io("http://localhost:5000");

let currentUserData =
    localStorage.getItem(
        "currentUser"
    );

if (

    !currentUserData ||

    currentUserData === "undefined"

) {

    alert("Please login first");

    window.location.href =
        "login.html";

}

let currentUser =
    JSON.parse(
        currentUserData
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
    fetch(

    "http://localhost:5000/messages",

    {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            sender:
                currentUser.name,

            receiver:
                "Global Chat",

            text:
                message
        })
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
let selectedUser = null;

async function loadUsers() {

    try {

        let response =

            await fetch(
                "http://localhost:5000/users/all"
            );

        let users =
            await response.json();

        let container =
            document.getElementById(
                "userList"
            );

        container.innerHTML = "";

        users.forEach(user => {

            if (

                user.name === currentUser.name

            ) return;

            container.innerHTML += `

                <div
                    class="user-card"
                    onclick="selectUser('${user.name}')"
                >

                    👤 ${user.name}

                </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

function selectUser(name){

    selectedUser = name;

    document.querySelectorAll(

        ".user-card"

    ).forEach(card=>{

        card.classList.remove(

            "active-user"

        );

        if(

            card.innerText.includes(name)

        ){

            card.classList.add(

                "active-user"

            );

        }

    });

}

loadUsers();