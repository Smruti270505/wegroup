async function loadVisitProfile() {

    let email =
        localStorage.getItem(

            "visitProfileEmail"
        );

    try {

        let response =
            await fetch(

                `http://localhost:5000/users/${email}`
            );

        let user =
            await response.json();

        document.getElementById(
            "visitAvatar"
        ).src =

            `https://ui-avatars.com/api/?name=${user.name}`;

        document.getElementById(
            "visitName"
        ).innerText =
            user.name;

        document.getElementById(
            "visitEmail"
        ).innerText =
            user.email;

        document.getElementById(
            "visitFollowers"
        ).innerText =
            user.followers.length;

        document.getElementById(
            "visitFollowing"
        ).innerText =
            user.following.length;

    } catch(error) {

        console.log(error);
    }
}

loadVisitProfile();