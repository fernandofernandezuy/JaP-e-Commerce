let password = document.getElementById("passwordLgn");
let email = document.getElementById("emailLgn");
let emailvalue = document.getElementById("emailLgn").value;


function validateLogin() {
  if (email.value.length === 0 && password.value.length > 0) {
    email.classList.add("is-invalid");
    email.focus();
  } else if (email.value.length > 0 && password.value.length === 0) {
    password.classList.add("is-invalid");
    password.focus();
  } else if (email.value.length === 0 && password.value.length === 0) {
    email.classList.add("is-invalid");
    email.focus();
    password.classList.add("is-invalid");
  } else {
    return true;
  }
}

//Funcion que guarda el email del usuario localStorage
function setUserEmail() {
  localStorage.setItem('email', email.value);
};

function setUserID(id) {
  localStorage.setItem('userID', id)
};

function redirectLogin() {
  window.location.href = "./inicio.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginBtn").addEventListener("click", function () {
    if (validateLogin()) {
      redirectLogin();
    }
    setUserEmail();
    setUserID(USER_ID);
  });
});
