let currentProductsArray = [];

function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    htmlContentToAppend += `
            <div onclick="" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `;
  }

  document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function showCatName() {
  let htmlContentToAppend = "";

  htmlContentToAppend += currentProducts.catName

  document.getElementById("product-name").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      currentProducts = resultObj.data;
      showProductsList();
    };
    showUserEmail();
    showCatName();
  });
});
