const MONEY_SYMBOL = "$";
const form = document.querySelectorAll(".needs-validation")

let currentArticlesArray = [];
let articleCount = undefined;
let articlesSubtotal = undefined;
let totalPrice = undefined;
let premiumRadio = document.getElementById("premiumradio");
let expressRadio = document.getElementById("expressradio");
let standardRadio = document.getElementById("standardradio");
let creditCardRadio = document.getElementById("creditCardRadio");
let accountRadio = document.getElementById("accountRadio");

function showCart(array) {
  let htmlContentToAppend = `
    <tr>
    <th scope="row"><img height="65px" src="${array.image}" alt=""></th>
    <td>${array.name}</td>
    <td>${array.currency} $${array.unitCost}</td>
    <td class="col-1"> <input
    type="number"
    name="articleCountInput"
    class="form-control"
    id="articleCountInput"
    required
    value="${array.count}"
    min="1"
    max="200"
  /></td>
  <td class="col-1"></td>
    <td id="articlesSubtotal"><strong>${array.currency} $${array.unitCost}</strong></td>
</tr>

        `;
  document.getElementById("cart-articles").innerHTML += htmlContentToAppend;
}

function calculateArticlesSubtotal() {
  articleCount = document.getElementById("articleCountInput").value;
  articlesSubtotal = currentArticlesArray.unitCost * articleCount;
  return articlesSubtotal;
}

function calculateShippingPrice() {
  let shippingPrice = 0;
  if (premiumRadio.checked) {
    shippingPrice = Math.round(
      currentArticlesArray.unitCost * articleCount * 0.15
    );
    return shippingPrice;
  } else if (expressRadio.checked) {
    shippingPrice = Math.round(
      currentArticlesArray.unitCost * articleCount * 0.07
    );
    return shippingPrice;
  } else if (standardRadio.checked) {
    shippingPrice = Math.round(
      currentArticlesArray.unitCost * articleCount * 0.05
    );
    return shippingPrice;
  }
}

function calculateTotalPrice() {
  totalPrice = calculateShippingPrice() + calculateArticlesSubtotal();
  return totalPrice;
}

function showPrices() {
  let productCostText = document.getElementById("productCostText");
  let shippingPriceText = document.getElementById("comissionText");
  let totalPriceText = document.getElementById("totalCostText");
  let radioButtons = [premiumRadio, expressRadio, standardRadio];
  let currency = currentArticlesArray.currency;


  // Muestro los precios cuando carga la página
  totalPriceText.innerHTML = `${currency} $${calculateTotalPrice()}`;
  shippingPriceText.innerHTML = `${currency} $${calculateShippingPrice()}`;
  productCostText.innerHTML = `${currency}  $${currentArticlesArray.unitCost}`;

  // Muestro los precios cuando se cambia el tipo de envio
  for (const radioBtn of radioButtons) {
    radioBtn.addEventListener("click", (e) => {
      shippingPriceText.innerHTML = `${currency} $${calculateShippingPrice()}`;
      totalPriceText.innerHTML = `${currency} $${calculateTotalPrice()}`;
    });
  }


  // Muestro los precios cuando se cambia la cantidad de articulos
  document
    .getElementById("articleCountInput")
    .addEventListener("change", (e) => {
      document.getElementById(
        "articlesSubtotal"
      ).innerHTML = `<strong>${currency} $${calculateArticlesSubtotal()}</strong>`;

      productCostText.innerHTML = `${currency} $${calculateArticlesSubtotal()}`;
      totalPriceText.innerHTML = `${currency} $${calculateTotalPrice()}`;
      shippingPriceText.innerHTML = `${currency} $${calculateShippingPrice()}`;
    });
}

function paymentValidity() {
  let inputRadios = [creditCardRadio, accountRadio];

  document.getElementById("paymentDiv").classList.add("is-invalid");

  for (const input of inputRadios) {
    input.addEventListener("click", function () {
      document.getElementById("paymentDiv").classList.remove("is-invalid");
    });
  }
}

function disabledModalInputs(boolean) {
  document.getElementById("cardNumber").disabled = boolean;
  document.getElementById("cardCode").disabled = boolean;
  document.getElementById("cardExp").disabled = boolean;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentArticlesArray = resultObj.data.articles[0];
    }
    showCart(currentArticlesArray); // Muestro el carrito del cliente
    articleCount = document.getElementById("articleCountInput").value;
    showPrices(); // Función para mostrar los precios en tiempo real

    creditCardRadio.addEventListener("click", function () { 
      disabledModalInputs(false);
      document.getElementById("accountNumber").disabled = true;
      document.getElementById("paymentText").innerHTML = "Tarjeta de crédito";
    });

    accountRadio.addEventListener("click", function () {
      disabledModalInputs(true);
      document.getElementById("accountNumber").disabled = false;
      document.getElementById("paymentText").innerHTML =
        "Transferencia bancaria";
    });


    (() => {
      "use strict";
      const forms = document.querySelectorAll(".needs-validation");
      // Validación de formulario
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (
              !form.checkValidity() ||
              (!creditCardRadio.checked && !accountRadio.checked)
            ) {
              event.preventDefault();
              event.stopPropagation();
                if (!creditCardRadio.checked && !accountRadio.checked) {
                paymentValidity();  // Validación del modal (Forma de Pago)

                }
                
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
    
  });
});
