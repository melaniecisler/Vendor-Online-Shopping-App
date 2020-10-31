$(document).on("click", ".delete-product", handleDeleteButtonPress);

function handleDeleteButtonPress(e) {
    e.preventDefault()
    var listItemData = $(this).data("id")

    $.ajax({
      method: "DELETE",
      url: "/api/products/" + listItemData
    })
      .then(function() {
          location.reload();
      });
  }

  