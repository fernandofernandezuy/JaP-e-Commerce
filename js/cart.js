const MONEY_SYMBOL = "$";

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
    <tr class="fs-5">
    <th scope="row"><img height="65px" src="${array.image}" alt=""></th>
    <td >${array.name}</td>
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

  totalPriceText.innerHTML = `${currency} $${calculateTotalPrice()}`
  shippingPriceText.innerHTML = `${currency} $${calculateShippingPrice()}`;
  productCostText.innerHTML = `${currency}  $${currentArticlesArray.unitCost}`;

  for (const radioBtn of radioButtons) {
    radioBtn.addEventListener("click", (e) => {
      shippingPriceText.innerHTML = `${currency} $${calculateShippingPrice()}`;
      totalPriceText.innerHTML = `${currency} $${calculateTotalPrice()}`
    });
  }
  
  document
    .getElementById("articleCountInput")
    .addEventListener("change", (e) => {
      document.getElementById(
        "articlesSubtotal"
      ).innerHTML = `<strong>${currency} $${calculateArticlesSubtotal()}</strong>`;

      productCostText.innerHTML = `${currency} $${calculateArticlesSubtotal()}`;
      totalPriceText.innerHTML = `${currency} $${calculateTotalPrice()}`
      shippingPriceText.innerHTML = `${currency} $${calculateShippingPrice()}`;
     
    });
}

function paymentValidity() {
  let inputRadios = [creditCardRadio, accountRadio]

  
    document.getElementById("paymentDiv").classList.add("is-invalid")


  for (const input of inputRadios) {

    input.addEventListener("click", function() {
      document.getElementById("paymentDiv").classList.remove("is-invalid")
    })
    
  }
}

function paymentModal(boolean) {
  
    document.getElementById("cardNumber").disabled = boolean;
    document.getElementById("cardCode").disabled = boolean;
    document.getElementById("cardExp").disabled = boolean;
  
}



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentArticlesArray = resultObj.data.articles[0];
    }
    showCart(currentArticlesArray); // Show Client Cart
    articleCount = document.getElementById("articleCountInput").value;
    showPrices();

    creditCardRadio.addEventListener("click", function() {
      paymentModal(false);
      document.getElementById("accountNumber").disabled = true;
      document.getElementById("paymentText").innerHTML = "Tarjeta de crédito";
    });

    accountRadio.addEventListener("click", function() {
      paymentModal(true);
      document.getElementById("accountNumber").disabled = false;
      document.getElementById("paymentText").innerHTML = "Transferencia bancaria";
    });
    

  
    (() => {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation');

      
      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {


          if ((!form.checkValidity()) || (!creditCardRadio.checked && !accountRadio.checked) ) {
            event.preventDefault()
            event.stopPropagation()
            if ((!creditCardRadio.checked && !accountRadio.checked)) {paymentValidity();}
          } else {
            document.getElementById("alertBought").classList.remove("d-none");
          }
    
          form.classList.add('was-validated')
        }, false)
      })
    })()
  });
});
