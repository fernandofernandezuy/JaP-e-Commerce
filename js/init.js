const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const USER_ID = 25801;

let userEmail = localStorage.getItem("email");
let catID = localStorage.getItem("catID");
let prodID = localStorage.getItem("prodID");
let userID = localStorage.getItem("userID");
let cartItems = [];

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

function showUserEmail() {
  let htmlContentToAppend = "";
  htmlContentToAppend += `${userEmail}`;
  document.getElementById("navbarDarkDropdownMenuLink").innerHTML =
    htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function () {
  
  showUserEmail();

    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("email");
      localStorage.removeItem("userID");
      localStorage.removeItem("userName");
      localStorage.removeItem("userSecondName");
      localStorage.removeItem("userSurname");
      localStorage.removeItem("userSecondSurname");
      localStorage.removeItem("userPhoneContact");
      localStorage.removeItem("profile-img");
    })

});

