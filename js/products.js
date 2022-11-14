const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_REL = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}


function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      return a.cost - b.cost;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      return b.cost - a.cost;
    });
  } else if (criteria === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      return b.soldCount - a.soldCount;
    });
  }

  return result;
}

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minCount == undefined || parseInt(product.cost) >= minCount) &&
      (maxCount == undefined || parseInt(product.cost) <= maxCount)
    ) {
      htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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
  }

  document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria) {
  currentSortCriteria = sortCriteria;

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  showProductsList();
}

//Funcion que muestra el nombre de la categoria
function showCatName() {
  let htmlContentToAppend = "";

  htmlContentToAppend += currentProductsObj.catName;

  document.getElementById("product-name").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  // Get products data
  getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      currentProductsObj = resultObj.data;
      // Show all the products in the screen
      showProductsList(); 
    }

    // Show the name of the category  in the subtitle
    showCatName();

    // Click to order the products by price (Lower to Higher)    
    document.getElementById("sortAsc").addEventListener("click", function () {
      sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    // Click to order the products by price (Higher to Lower)    
    document.getElementById("sortDesc").addEventListener("click", function () {
      sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    // Click to order de product by reliability (Amount of sold products)
    document
      .getElementById("sortByCount")
      .addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_REL);
      });

     // Click to clear the range filter
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

        if (parseInt(minCount) >= 0) {
          minCount = parseInt(minCount);
        } else {
          minCount = undefined;
        }

        if (parseInt(maxCount) >= 0) {
          maxCount = parseInt(maxCount);
        } else {
          maxCount = undefined;
        }

        showProductsList();
      });
  });
});
