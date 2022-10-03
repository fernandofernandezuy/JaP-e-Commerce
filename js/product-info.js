let currentProductsArray = [];
let currentCategoryArray = [];
let currentProductsCommentsArray = [];

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
};

//Funcion que muestra la información del producto seleccionado.
function showProductInfo() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (product.id == prodID) {
      htmlContentToAppend += `
        <h2>${product.name}</h2>
        <br />
        <hr />
            <h4 class="text-left"><strong>Precio</strong></h4>
                <p class="lead">${product.currency} ${product.cost}</p>
            <h4 class="text-left"><strong>Descripción</strong></h4>
                <p class="lead">${product.description}</p>
            <h4 class="text-left"><strong>Categoría</strong></h4>
                <p class="lead">${currentCategoryArray.catName}</p>
            <h4 class="text-left"><strong>Cantidad de vendidos</strong></h4>
                <p class="lead">${product.soldCount}</p>
            <h4 class="text-left"><strong>Imagenes Ilustrativas</strong></h4>
                <div class="d-flex col-3">
                    <img class="img-thumbnail" src="img/prod${prodID}_1.jpg" alt="${product.name}" />
                    <img class="img-thumbnail" src="img/prod${prodID}_2.jpg" alt="${product.name}" />
                    <img class="img-thumbnail" src="img/prod${prodID}_3.jpg" alt="${product.name}" />
                    <img class="img-thumbnail" src="img/prod${prodID}_4.jpg" alt="${product.name}" />
                </div>
          
              `;
    }
  }
  document.getElementById("product-info").innerHTML = htmlContentToAppend;
}


//Funcion que muestra la cantidad de estrellas de un producto según la puntuacion del cliente.
function showStars(score) {
  let stars = ``
  if (score == 1) {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
  }
  else if (score == 2) {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
  }
  else if (score == 3) {
    stars =  `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
  }
  else if (score == 4) {
    stars =  `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>`
  }
  else  {
    stars =  `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>`
  }
  return stars
}

//Función que muestra los comentarios escritos por los clientes.
function showCommentsList() {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsCommentsArray.length; i++) {
    let comment = currentProductsCommentsArray[i];
    let score = parseInt(comment.score);

      htmlContentToAppend += `
      <div class="list-group-item list-group-item-action">
      <div class="row">
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <p class="mb-1 lead"> <strong>${comment.user}</strong> - ${comment.dateTime} - ${showStars(score)} </p>
              </div>
              <p class="mb-1 lead"> ${comment.description} </p>
          </div>
      </div>
  </div>
  `;
      document.getElementById("comment-list").innerHTML = htmlContentToAppend;
    
  }
}

function showRelatedProducts() {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (prodID != product.id) {
      htmlContentToAppend += `
      <div onclick="setProdID(${product.id})" class="card cursor-active mx-2" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <p class="card-text">${product.name}</p>
        </div>
      </div>
            `;
    }
  }

  document.getElementById("related-products").innerHTML = htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      currentCategoryArray = resultObj.data;
    }
    showProductInfo();
    showRelatedProducts();
  });

  //Realizo la solicitud para obtener la información de los comentarios del producto seleccionado
  getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      currentProductsCommentsArray = resultObj.data;
    }
    //Muestro los comentarios de los clientes
    showCommentsList();
  });
 
});
