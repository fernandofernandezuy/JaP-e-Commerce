let currentProductArray = [];
let currentRelatedProductsArray = [];
let currentProductsCommentsArray = [];

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

//Funcion que muestra la información del producto seleccionado.
function showProductInfo(array) {
  let htmlContentToAppend = "";
  htmlContentToAppend += `
        <div class="d-flex mt-3 justify-content-between">
        <h2>${array.name}</h2> 
        <button class="btn btn-success" type="button" id="addToCart">Añadir</button>
      </div>
    
        <hr />
            <h5 class="text-left"><strong>Precio</strong></h5>
                <p class="lead">${array.currency} ${array.cost}</p>
            <h5 class="text-left"><strong>Descripción</strong></h5>
                <p class="lead">${array.description}</p>
            <h5 class="text-left"><strong>Categoría</strong></h5>
                <p class="lead">${array.category}</p>
            <h5 class="text-left"><strong>Cantidad de vendidos</strong></h5>
                <p class="lead">${array.soldCount}</p>
                <hr />
            <div id="carouselExampleIndicators" class="carousel m-auto slide w-75" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/prod${prodID}_1.jpg" class="d-block w-100" alt="${array.name}">
    </div>
    <div class="carousel-item">
      <img src="img/prod${prodID}_2.jpg" class="d-block w-100" alt="${array.name}">
    </div>
    <div class="carousel-item">
      <img src="img/prod${prodID}_3.jpg" class="d-block w-100" alt="${array.name}">
    </div>
    <div class="carousel-item">
      <img src="img/prod${prodID}_4.jpg" class="d-block w-100" alt="${array.name}">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<hr />
            
              `;
  document.getElementById("product-info").innerHTML += htmlContentToAppend;
}

//Funcion que muestra la cantidad de estrellas de un producto según la puntuacion del cliente.
function showStars(score) {
  let stars = ``;
  if (score == 1) {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`;
  } else if (score == 2) {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`;
  } else if (score == 3) {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`;
  } else if (score == 4) {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>`;
  } else {
    stars = `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>`;
  }
  return stars;
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
              
                  <p class="mb-1 lead"> <strong>${
                    comment.user
                  } </p>
              <p class="mb-1"> </strong> ${showStars(score)} </p>
              <p class="mb-1 lead"> ${comment.description} </p>
              <p class="mb-1 lead"> ${comment.dateTime}</p>
          </div>
      </div>
  </div>
  `;
    document.getElementById("comment-list").innerHTML = htmlContentToAppend;
  }
}

function showRelatedProducts() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentRelatedProductsArray.length; i++) {
    let product = currentRelatedProductsArray[i];

    htmlContentToAppend += `
      <div onclick="setProdID(${product.id})" class="card cursor-active mx-2" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <p class="card-text">${product.name}</p>
        </div>
      </div>
            `;
  }

  document.getElementById("related-products").innerHTML += htmlContentToAppend;
}

function addProductToCart() {
  let cartItem = localStorage.getItem("cartProduct");

  cartItems = localStorage.getItem("cartProduct").split(",");
  cartItems.push("cartProduct");
  localStorage.setItem("cartProduct", cartItem);
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductArray = resultObj.data;
      currentRelatedProductsArray = resultObj.data.relatedProducts;
    }
    showProductInfo(currentProductArray);
    showRelatedProducts();

    document.getElementById("addToCart").addEventListener("click", (e) => {
      localStorage.setItem("cartProduct", JSON.stringify(currentProductArray));
      addProductToCart();
    });
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
