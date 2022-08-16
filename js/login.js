let password = document.getElementById("passwordLgn")
let email = document.getElementById("emailLgn")
let emailError = document.getElementById("email-error")
let passwordError = document.getElementById("password-error")

function inputErrorAlert(input, inputError) {
    input.style.border = "1px solid red";
    input.style.border;
    input.classList.add("inputlgn")
    inputError.classList.add("show");
}


function validateLogin() {
    if (email.value.length === 0 && password.value.length > 0) {
        inputErrorAlert(email, emailError);
        email.focus();
    } else if (email.value.length > 0 && password.value.length === 0) {
        inputErrorAlert(password, passwordError);
        password.focus();
    } else if (email.value.length === 0 && password.value.length === 0) {
        inputErrorAlert(email, emailError);
        email.focus();
        inputErrorAlert(password, passwordError);
    } else {
        return true
    }
}

function init() {
    gapi.load('auth2', function () {
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    successLogin();
}

function successLogin() {
    if ((validateLogin()) || (GoogleAuth.isSignedIn.get())) {
        window.location.href = "./inicio.html"
    }
}

document.getElementById("loginBtn").addEventListener("click", function () {
    validateLogin();
    successLogin();
});



