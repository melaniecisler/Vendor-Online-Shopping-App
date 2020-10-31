$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and product select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var productSelect = $("#product");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var productId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?product_id=") !== -1) {
    productId = url.split("=")[1];
    getPostData(productId, "product");
  }
  // Otherwise if we have an product_id in our url, preset the product select box to be our Product

  // Getting the products, and their posts
  getProducts();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or product
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !productSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      ProductId: productSelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an product's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
    case "post":
      queryUrl = "/api/posts/" + id;
      break;
    case "product":
      queryUrl = "/api/products/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.ProductId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        productId = data.ProductId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Products and then render our list of Products
  function getProducts() {
    $.get("/api/products", renderProductList);
  }
  // Function to either render a list of products, or if there are none, direct the user to the page
  // to create an product first
  function renderProductList(data) {
    if (!data.length) {
      window.location.href = "/products";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createProductRow(data[i]));
    }
    productSelect.empty();
    console.log(rowsToAdd);
    console.log(productSelect);
    productSelect.append(rowsToAdd);
    productSelect.val(productId);
  }

  // Creates the product options in the dropdown
  function createProductRow(product) {
    var listOption = $("<option>");
    listOption.attr("value", product.id);
    listOption.text(product.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
