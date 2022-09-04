const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_REL = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined &&
          parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    )

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

function sortAndShowProducts(sortCriteria, ProductsArray) {
  currentSortCriteria = sortCriteria;

  if (ProductsArray != undefined) {
    currentProductsArray = ProductsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  showProductsList();
}

function showCatName() {
  let htmlContentToAppend = "";

  htmlContentToAppend += currentProductsObj.catName

  document.getElementById("product-name").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      currentProductsObj = resultObj.data;
      showProductsList();
    };

    showUserEmail();
    showCatName();

    document.getElementById("sortAsc").addEventListener("click", function () {
      sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
  
    document.getElementById("sortDesc").addEventListener("click", function () {
      sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
  
    document.getElementById("sortByCount").addEventListener("click", function () {
      sortAndShowProducts(ORDER_BY_PROD_REL);
    });
  
    document
      .getElementById("clearRangeFilter")
      .addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
  
        minCount = undefined;
        maxCount = undefined;
  
        showProductsList();
      });
  
    document
      .getElementById("rangeFilterCount")
      .addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
  
        if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
          minCount = parseInt(minCount);
        } else {
          minCount = undefined;
        }
  
        if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
          maxCount = parseInt(maxCount);
        } else {
          maxCount = undefined;
        }
  
        showProductsList();
      });
  });
});
