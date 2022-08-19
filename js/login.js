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

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); 
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
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

function successLogin() {
    if (validateLogin()) {
        window.location.href = "./inicio.html"
    }
}

document.getElementById("loginBtn").addEventListener("click", function () {
    validateLogin();
    successLogin();
});



