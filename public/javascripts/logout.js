document.getElementById("app-main-desktop__signoutbtn").addEventListener("click", function(){
    logout();
});

// LOGOUT - F I R E B A S E
function logout() {
    firebase.auth().signOut().then(() => {
        console.log("Firebase sign-out successful.");

        fetch('/logout', {
            method: 'POST'
        })
        .then(() => {
            console.log("Session destroyed and logged out.");
            window.location.href = '/'; 
        })
        .catch((error) => {
            console.error("Error logging out:", error);
        });
    }).catch((error) => {
        console.error("Firebase sign-out error:", error);
    });
}