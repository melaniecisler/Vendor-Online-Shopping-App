$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var nameInput = $("#product-name");
    var priceInput = $("#price");
    var descriptionInput = $("#description");
    var productList = $("tbody");
    var productContainer = $(".product-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", "#product-form", handleProductFormSubmit);
    $(document).on("click", ".delete-product", handleDeleteButtonPress);
  
    // Getting the initial list of Authors
    getProducts();
  
    // A function to handle what happens when the form is submitted to create a new Author
    function handleProductFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertProduct({
        name: nameInput
          .val()
          .trim(),
          price: priceInput.val().trim(),
          description: descriptionInput.val().trim()
      });
    }
  
    // A function for creating an author. Calls getAuthors upon completion
    function upsertProduct(productData) {
      console.log(productData)
      $.post("/api/products", productData)
        .then(getProducts);
    }
  
    // Function for creating a new list row for authors
    function createProductRow(productData) {
      var newTr = $("<tr>");
      newTr.data("product", productData);
      newTr.append("<td>" + productData.name + "</td>");
      if (productData.Posts) {
        newTr.append("<td> " + productData.Posts.length + "</td>");
      } else {
        newTr.append("<td>0</td>");
      }
      newTr.append("<td><a href='/blog?product_id=" + productData.id + "'>Go to Posts</a></td>");
      newTr.append("<td><a href='/cms?product_id=" + productData.id + "'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-product'>Delete Product</a></td>");
      return newTr;
    }
  
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getProducts() {
      $.get("/api/products", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createProductRow(data[i]));
        }
        renderProductList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of authors to the page
    function renderProductList(rows) {
      productList.children().not(":last").remove();
      productContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        productList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no authors
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create a Product before you can create a Post.");
      productContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("product");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/products/" + id
      })
        .then(getProducts);
    }
  });
  