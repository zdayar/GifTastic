$(document).ready(function () {

    // Initial array of breeds
    var breeds = ["Corgi", "Pomeranian", "Papillon", "Chihuahua"];

    // Function for displaying the buttons
    function renderButtons() {

        var $buttons = $("#buttons-view");

        $buttons.empty();
        $buttons.html("<br>");

        // Loop through the array of breeds
        for (var i = 0; i < breeds.length; i++) {
            // Then dynamicaly generates buttons for each breed in the array
            var $newButton = $("<button>");

            // Add a data attribute for the breed
            $newButton.attr("data-breed", breeds[i]);
            // Add some bootstrap classes and attributes to our button
            // and a "breed" class
            $newButton.attr("type", "button");
            $newButton.addClass("btn btn-info btn-sm breed");

            // Provide button text
            $newButton.text(breeds[i]);
            // Added the button to the buttons-view div
            $buttons.append($newButton);
        }
    }

    // This function handles events where the add breed button is clicked
    $("#add-breed").on("click", function (event) {
        event.preventDefault();

        // grab the input from the textbox
        var $breedInput = $("#breed-input");
        var breed = $breedInput.val().trim();

        // add it to the breeds array
        breeds.push(breed);

        // Render all buttons including the new one
        renderButtons();

        // clear input field
        $breedInput.val('');
    });


    // displayGifs function re-renders the HTML to display the appropriate content
    function displayGifs() {

        // clear the gifs area of the screen first
        $("#gifs-view").empty();

        var clickedBreed = $(this).attr("data-breed");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedBreed + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {
                var results = response.data;

                // display each gif
                for (var i = 0; i < results.length; i++) {
                    // create <p> for the rating
                    var $p = $("<p>").text("Rating: " + results[i].rating);

                    // create <img> for the gif
                    var $breedImage = $("<img>").addClass("gif");
                    // image should be still to start with
                    $breedImage.attr("data-state","still");
                    $breedImage.attr("data-still",results[i].images.fixed_height_still.url);
                    $breedImage.attr("data-animate",results[i].images.fixed_height.url);
                    $breedImage.attr("src", results[i].images.fixed_height_still.url);

                    // add the rating and the gif to a new div
                    var $gifDiv = $("<div>").addClass("inline");
                    $gifDiv.append($p);
                    $gifDiv.append($breedImage);

                    // add the new div to the div on screen for all gifs
                    $("#gifs-view").append($gifDiv);
                }
            });
    }

    // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".breed", displayGifs);

    // click event listener for the gif images to toggle between animated and still
    $(document).on("click", ".gif", function () {

        // what is the state of gif now?
        var state = $(this).attr("data-state");

        // flip the state and change the img src accordingly
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});