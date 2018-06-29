var userText = "";
var topics = ["Jack Nicholson", "Rowan Atkinson", "Peter Sellers", "Ice Cube", "Will Ferrell", "Conan O'Brien"];
var giphysFull = false;
var giphyImage = "";
var imageRating = "";
var rating = "";

//helper function appends buttons to giphyButton div
function createButtons() {
    $(".giphyButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        $("<button class='topics'>" + topics[i] + "</button>").appendTo(".giphyButtons");
	}
}
//helper function adds users entry to button list
function addUserText() {
    topics.push(userText);
}

//helper function clears text from search bar 
function clearUserText() {
	userText = "";
	$(".searchBox").val("");
}

$(document).ready(function () {
	createButtons();
	$(".addButton").click(function () {
		userText = $(".searchBox").val();
		addUserText();
		createButtons();
		clearUserText();
	});

	$(".buttonSection").on("click", ".topics", function () {
		var giphyChoiceText = $(this).text();
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + giphyChoiceText + "&limit=10&offset=0&lang=en&api_key=L4zB8gxw67IA58eEsgm0EaSnIcZ24ICG";
		$.ajax({
			url: queryUrl,
			method: 'GET'
			}).done(function (response) {
			function giphyGenerate() {
				for (var i = 0; i < response.data.length; i++) {
					giphyImage = $("<img class='stillPictures'>");
					giphyImage.attr('src', response.data[i].images.fixed_height_still.url);
					giphyImage.attr('data-still', response.data[i].images.fixed_height_still.url);
					giphyImage.attr('data-animate', response.data[i].images.fixed_height.url);
					giphyImage.attr('data-state', "still");
					imageRating = response.data[i].rating;
					rating = $("<div class='rating'>");
					rating.text("Rating: " + imageRating);
					$(".giphyImages").append(rating);
					$(".giphyImages").append(giphyImage);
					giphysFull = true;
					}
				}
				if (giphysFull == false) {
					giphyGenerate();
				} else {
					$(".giphyImages").empty();
					giphysFull = false;
					giphyGenerate();
				}
			});
		});

	$(document).on("click", ".stillPictures", function () {
		var that = $(this);
		var currentData = that.attr("data-state");
		var animateCurrent = that.attr("data-animate");
		var stillCurrent = that.attr("data-still");
		if (currentData == "still") {
			that.attr('data-state', "animate");
			that.attr('src', animateCurrent);
		} else if (currentData == "animate") {
			that.attr('data-state', "still");
			that.attr('src', stillCurrent);
		}
	});
});