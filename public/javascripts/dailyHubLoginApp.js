//const auth = firebase.auth();

document.getElementById("dailyHub_NewUserBtn").addEventListener('click', function(){
    document.getElementById("dailyHub_login_formDiv").style.display = 'none';
    document.getElementById("dailyHub_NewUserBtn").style.display = 'none';
    document.getElementById("dailyHub_SwitchtoLogin").style.display = 'flex';
    document.getElementById("dailyHub_new_signup_formDiv").style.display = 'block';
});

document.getElementById("dailyHub_SwitchtoLogin").addEventListener('click', function(){
    document.getElementById("dailyHub_SwitchtoLogin").style.display = 'none';
    document.getElementById("dailyHub_new_signup_formDiv").style.display = 'none';
    document.getElementById("dailyHub_login_formDiv").style.display = 'block';
    document.getElementById("dailyHub_NewUserBtn").style.display = 'flex';
});

document.getElementById('dailyHub_Newlogin_btn').addEventListener('click', function (event) {
    event.preventDefault();
    registerUser();
});

document.getElementById('dailyHub_login_btn').addEventListener('click', function (e) {
    e.preventDefault();
    authenticateUser();
});


// AUTHENTICATE EXISTING USER - F I R E B A S E
function authenticateUser() {
    let email = document.getElementById('dailyHub_login_email').value;
    let password = document.getElementById('dailyHub_login_password').value;
    if (password == "" || email == "") {
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log("User signed in:", user);
            if (user) {
                $.ajax({
                    url: '/app/existingUser',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        uid: user.uid,
                    }),
                    success: function (data) {
                        let username = data[0].user_name;
                        console.log(username);
                        $.ajax({
                            url: '/setUsername',
                            type: 'POST',
                            data: { username: username,uid:user.uid },
                            success: function (response) {
                                window.location.href = '/app';
                            },
                            error: function (error) {
                                console.error('Error:', error);
                            }
                        });
                    },
                    error: function (error) {
                        console.error('Error:', error);
                    }
                })
            }

        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.error("Error signing in:", errorCode, errorMessage);
        });
}

// NEW USER CREATION - F I R E B A S E
function registerUser() {
    let email = document.getElementById('dailyHub_new_email').value;
    let password = document.getElementById('dailyHub_new_password').value;
    let username = document.getElementById('dailyHub_new_username').value;
    if (password == "" || email == "") {
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            newUser(userCredential.user.uid, username, email);
        })
        .catch((error) => {
            console.error("Error in user registration: ", error);
        });
}

function newUser(uid, username, email) {
    $.ajax({
        url: '/app/newuser',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            firebase_uid: uid,
            username: username,
            email: email
        }),
        success: function (response) {
            $.ajax({
                url: '/setUsername',
                type: 'POST',
                data: { username: username, uid:uid },
                success: function (response) {
                    window.location.href = '/app';
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

