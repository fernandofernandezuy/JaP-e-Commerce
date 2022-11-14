let nameInput = document.getElementById("firstName");
let secondNameInput = document.getElementById("secondName");
let surnameInput = document.getElementById("firstSurName");
let secondSurnameInput = document.getElementById("secondSurName");
let emailInput = document.getElementById("emailProfile");
let contactPhoneInput = document.getElementById("contactPhone");
let imageInput = document.getElementById("chooseImg");
let image = document.getElementById("profileImg")

if (!userEmail) {
    window.location.href = "index.html"
}

document.addEventListener("DOMContentLoaded", function () {


    // Show user Information
    emailInput.value = userEmail;
    nameInput.value = localStorage.getItem("userName");
    secondNameInput.value = localStorage.getItem("userSecondName");
    surnameInput.value = localStorage.getItem("userSurname");
    secondSurnameInput.value = localStorage.getItem("userSecondSurname");
    contactPhoneInput.value = localStorage.getItem("userPhoneContact");
    const recentImage = localStorage.getItem("profile-img");
    image.setAttribute("src", recentImage);

    
   
    (() => {
        'use strict'
      

        const forms = document.querySelectorAll('.needs-validation')
      
        //Field validity
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            } else if (form.checkValidity) {
                localStorage.setItem("userName", nameInput.value);
                localStorage.setItem("userSecondName", secondNameInput.value);
                localStorage.setItem("userSurname", surnameInput.value);
                localStorage.setItem("userSecondSurname", secondSurnameInput.value);
                localStorage.setItem("userPhoneContact", contactPhoneInput.value);
                
                

            }
            
            ;
            form.classList.add('was-validated')
          }, false)
        })
      })()

      imageInput.addEventListener("change", () => {
        const fr = new FileReader();

        fr.readAsDataURL(imageInput.files[0]);

        fr.addEventListener("load", () => {
            const url = fr.result;
            console.log(url);
            localStorage.setItem("profile-img", url);
            
        })
    })
     
})