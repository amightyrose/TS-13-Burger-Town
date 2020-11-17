// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
	$(".eat-button").on("click", function(event) {
	  const id = $(this).data("id");
  
	  // Send the PUT request.
	  $.ajax("/api/burgers/" + id, {
		type: "PUT",
	  }).then(
		function() {
		  console.log("ate the burger");
		  // Reload the page to get the updated list
		  location.reload();
		}
	  );
	});
  
	$("#newBurgerForm").on("submit", function(event) {
	  // Make sure to preventDefault on a submit event.
	  event.preventDefault();
  
	  const objNewBurger = {
		name: $("#burgerName").val().trim(),
	  };
  
	  // Send the POST request.
	  $.ajax("/api/burgers", {
		type: "POST",
		data: objNewBurger
	  }).then(
		function() {
		  console.log("created new burger");
		  // Reload the page to get the updated list
		  location.reload();
		}
	  );
	});
  
  });
  