function showNotifications() {

    let panel =
        document.getElementById("notificationPanel");

    panel.classList.toggle("show-notifications");
}

function loadNotifications() {

    let panel =
        document.getElementById("notificationPanel");

    if (!panel) return;

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    panel.innerHTML = "<h3>Notifications</h3>";

    notifications.forEach(function(note) {

        panel.innerHTML += `
            <p>${note}</p>
        `;
    });
}
function updateNotificationCount() {

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    let count =
        document.getElementById("notificationCount");

    if (count) {

        count.innerText = notifications.length;
    }
}
loadOnlineUsers();

updateNotificationCount();
