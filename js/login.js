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

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
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



