let currentArticlesArray = [];

function showCart(array) {
  let htmlContentToAppend = `
    <tr class="fs-5">
    <th scope="row"><img height="65px" src="${array.image}" alt=""></th>
    <td >${array.name}</td>
    <td>${array.currency} $${array.unitCost}</td>
    <td> <input
    type="number"
    name="articleCountInput"
    class="form-control w-50"
    id="articleCountInput"
    required
    value="${array.count}"
    min="1"
    max="200"
  /></td>
    <td id="articlesSubtotal"><strong>${array.currency} $${array.unitCost}</strong></td>
</tr>

        `;
  document.getElementById("cart-articles").innerHTML += htmlContentToAppend;
}

function calculateArticlesSubtotal() {
  document
  .getElementById("articleCountInput")
  .addEventListener("change", (e) => {
    let articleCount = document.getElementById("articleCountInput").value;

    document.getElementById("articlesSubtotal").innerHTML = `<strong>${
      currentArticlesArray.currency
    } $${currentArticlesArray.unitCost * articleCount}</strong>`;
  });
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentArticlesArray = resultObj.data.articles[0];
    }
    showCart(currentArticlesArray);
    calculateArticlesSubtotal();
   
   
  });

});
