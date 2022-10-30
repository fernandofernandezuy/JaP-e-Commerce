const MONEY_SYMBOL = "$";

let currentArticlesArray = [];
let articleCount = undefined;
let articlesSubtotal = undefined;
let totalPrice = undefined;
let premiumRadio = document.getElementById("premiumradio");
let expressRadio = document.getElementById("expressradio");
let standardRadio = document.getElementById("standardradio");

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




document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentArticlesArray = resultObj.data.articles[0];
    }
    showCart(currentArticlesArray); // Show Client Cart
    articleCount = document.getElementById("articleCountInput").value;
    showPrices();
  });
});
