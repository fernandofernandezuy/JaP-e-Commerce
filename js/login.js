let password = document.getElementById("passwordLgn");
let email = document.getElementById("emailLgn");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");

function inputErrorAlert(input, inputError) {
  input.style.border = "1px solid red";
  input.classList.add("inputlgn");
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
    return true;
  }
}

function redirectLogin() {
  window.location.href = "./inicio.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginBtn").addEventListener("click", function () {
    if (validateLogin()) {
      redirectLogin();
    }
  });
});
