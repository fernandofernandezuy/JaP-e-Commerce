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
    console.log("Encoded JWT ID token: " + response.credential);
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "455520071179-sm5gig5a1asi0mqspvtv9m7bj3p3tg3v.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large" } 
    );
    google.accounts.id.prompt(); 
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



