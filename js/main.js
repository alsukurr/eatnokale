var app = {};

// app.pageNum = 0;

//Get Recipe information
app.getRecipes = function(type) {
	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			_app_id: '787227ff',
			_app_key: '7cb1664d4c03746d9f27b19fb91efa82',
			requirePictures: true,
			allowedDiet: "386^Vegan",
			source: "sourceSiteUrl",
			q: type
		},
		success: function(res){
			// console.log(res);
			app.displayRecipes(res.matches);
		}
	});
};


//After we get the info, display the condensed recipe
app.displayRecipes = function(recipeData){

	$('#recipe-container').empty();

	$.each(recipeData, function(i, recipe){
		//title
		var $title = $('<h3>').text(recipe.recipeName);
		// url
		var $url = "href=http://www.yummly.com/recipe/"+recipe.id;

		//image
		if (recipe.hasOwnProperty('smallImageUrls')){
			var imgSrc = recipe.smallImageUrls.toString().replace('=s90','');
			var $image = $('<img>').attr('src', imgSrc);
		};
		//result
		var $result = $('<a target="_blank"'+$url+'>').addClass('recipe-items').append($image, $title).attr('data-ingredients', recipe.ingredients).attr('data-rating', recipe.rating).attr('data-prepTime', recipe.totalTimeInSeconds);

		$result.data('info', recipe)
		$('#recipe-container').append($result);

		$('footer').show();

	});
};


app.events = function(){

	$('.search').on('submit', function(e){
		e.preventDefault();
		//Get the entered user input
		var searchQuery = $(this).find('input[type=search]').val();
		console.log(searchQuery);
		//Pass that value to the app.getRecipes() method
		app.getRecipes(searchQuery);
		//clear search value after submitting
		$(this).find('input[type=search]').val();
	});
};

app.init = function() {
	app.events();
};

app.init();