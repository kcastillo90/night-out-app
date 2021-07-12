let numLat = null
let numLong = null
let latitude = ''
let longitude = ''

const getCoords = (position) => {
  numLat = position.coords.latitude
  latitude = numLat.toString()
  numLong = position.coords.longitude
  longitude = numLong.toString()
}

navigator.geolocation.getCurrentPosition(getCoords)


$(() => {

  // Night Out
  const $getRestaurants = (latitude, longitude) => {


    $.ajax({
      async: true,
      crossDomain: true,
      url: `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${latitude}&longitude=${longitude}&limit=10&currency=USD&distance=1&lunit=mi&lang=en_US`,
      method: "GET",
      headers: {
        "x-rapidapi-key": "b2f472e935msh7663e7338a2a0ccp163839jsn46d01b6947ed",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
        }
      }).then(
        (results) => {
          console.log(results)

          console.log(results.data);

          for(i = 0; i < results.data.length; i++)  {
            if(results.data[i].hasOwnProperty('ad_position') === true){
            } else {
              const $restaurantDiv = $('<div>').attr(`id`, `${results.data[i].name}`)
              if(results.data[i].hasOwnProperty('photo') === true) {
                const $restaurantImgDiv = $('<div>').appendTo($restaurantDiv)
                const $restaurantImg = $(`<img src='${results.data[i].photo.images.small.url}'>`).appendTo($restaurantImgDiv)
              }
              const $restaurant = $('<dt>').attr(`id`, `${results.data[i].name}`).text(`${results.data[i].name}`)
              const $restaurantDetails = $('<dl>')
                const $priceRange = $('<dd>').text(`${results.data[i].price_level}`).appendTo($restaurantDetails)
                const $websiteDD = $('<dd>').appendTo($restaurantDetails)
                const $website = $('<a>').attr('href', `${results.data[i].website}`).text(`${results.data[i].website}`).appendTo($websiteDD)
                const $phone = $('<dd>').text(`${results.data[i].phone}`).appendTo($restaurantDetails)
                const $address = $('<dd>').text(`${results.data[i].address}`).appendTo($restaurantDetails)
              $restaurantDiv.append($restaurant, $restaurantDetails)
              $('#restaurant_carousel').append($restaurantDiv)
            }
          }

      })

    setTimeout(() => {
      // Carousel next and previous buttons:
      let $currentRestaurant = 0
      // will be index of restaurant array once it's generated (starting at 0)
      let $numOfRestaurants = $('#restaurant_carousel').children().length - 1
      console.log(`Number of restaurants = ${$numOfRestaurants}`);

      // creates an array out of the restaurant list
      const $restaurantsTotal = $('#restaurant_carousel').children()
      console.log($restaurantsTotal);


      // Next button:
      $('#next').on('click', () => {
        $('#next').addClass('pressedButton')
        setTimeout(() => {
          $('#next').removeClass('pressedButton')
        }, 150)
        $restaurantsTotal.eq($currentRestaurant).css('display', 'none')
        if($currentRestaurant < $numOfRestaurants) {
          $currentRestaurant++
        } else {
          $currentRestaurant = 0
        }

        $restaurantsTotal.eq($currentRestaurant).css('display', 'block')

      })

      $('#prev').on('click', () => {
        $('#prev').addClass('pressedButton')
        setTimeout(() => {
          $('#prev').removeClass('pressedButton')
        }, 150)
        $restaurantsTotal.eq($currentRestaurant).css('display', 'none')
        if($currentRestaurant > 0) {
          $currentRestaurant--
        } else {
          $currentRestaurant = $numOfRestaurants
        }

        $restaurantsTotal.eq($currentRestaurant).css('display', 'block')

      })
    }, 2000)
  }         // End of get restaurants function


  // Form submit to activate restaurant retrieval
  $('#get-restaurants-button').on('click', (e) => {
    e.preventDefault()

    alert(`Retrieving results, please wait a few seconds...`)

    $('#get-restaurants-button').addClass('pressedButton')
    setTimeout(() => {
      $('#get-restaurants-button').removeClass('pressedButton')
    }, 150)

    $('#restaurant_carousel').empty()

    setTimeout(() => {

      $getRestaurants(latitude, longitude)


    }, 3000)

  })


  // Night In

  const $getRecipes = (ev) => {

    $.ajax({
      url: 'https://api.spoonacular.com/recipes/random?apiKey=e188e1e8977c41cabb948fe83c569f5c&number=10&limitLicense=true',

    }).then(
      (recipes) => {
        console.log(recipes.recipes);

        for(i = 0; i < recipes.recipes.length; i++) {
          const $recipeDiv = $('<div>').attr('id', `${recipes.recipes[i].title}`).appendTo($('#recipe_carousel'))
          const $recipeImg = $(`<img src='${recipes.recipes[i].image}'>`).appendTo($recipeDiv)
            const $recipe = $('<dt>').attr('id', `${recipes.recipes[i].title}`).text(`${recipes.recipes[i].title}`).appendTo($recipeDiv)
            const $recipeDetails = $('<dl>').appendTo($recipeDiv)
              const $recipeSum = $('<dd>').html(`${recipes.recipes[i].summary}`).appendTo($recipeDetails)
              const $recipeSiteDD = $('<dd>').appendTo($recipeDetails).appendTo($recipeDetails)
              const $recipeSite = $('<a>').attr('href', `${recipes.recipes[i].sourceUrl}`).text(`Link to recipe`).appendTo($recipeSiteDD)
              const $recipeCredit = $('<dd>').text(`Credits: ${recipes.recipes[i].creditsText}`).appendTo($recipeDetails)
        }

        // Carousel next and previous buttons:
        let $currentRecipe = 0
        // will be index of recipe array once it's generated (starting at 0)
        let $numOfRecipes = $('#recipe_carousel').children().length - 1
        console.log(`Number of recipes = ${$numOfRecipes}`);
        // creates an array out of the recipe list
        const $recipesTotal = $('#recipe_carousel').children()
        console.log($recipesTotal);

        // Next button:
        $('#next_recipe').on('click', () => {
          $('#next_recipe').addClass('pressedButton')
          setTimeout(() => {
            $('#next_recipe').removeClass('pressedButton')
          }, 150)
          $recipesTotal.eq($currentRecipe).css('display', 'none')
          if($currentRecipe < $numOfRecipes) {
            $currentRecipe++
          } else {
            $currentRecipe = 0
          }

          $recipesTotal.eq($currentRecipe).css('display', 'flex').css('flex-direction', 'column').css('align-content', 'center')

        })
        // Previous button:
        $('#prev_recipe').on('click', () => {
          $('#prev_recipe').addClass('pressedButton')
          setTimeout(() => {
            $('#prev_recipe').removeClass('pressedButton')
          }, 150)
          $recipesTotal.eq($currentRecipe).css('display', 'none')
          if($currentRecipe > 0) {
            $currentRecipe--
          } else {
            $currentRecipe = $numOfRecipes
          }

          $recipesTotal.eq($currentRecipe).css('display', 'block')

        })
      })
  } // End of recipes function

  $('#get-recipes').on('click', (ev) => {       // Get recipes button
    ev.preventDefault()

    $('#get-recipes').addClass('pressedButton')
    setTimeout(() => {
      $('#get-recipes').removeClass('pressedButton')
    }, 150)

    $('#recipe_carousel').empty()

    $getRecipes()

  })

  // Event listeners to control flipping of app from night-out to night-in
  $('#night-out-h1').on('click', (e) => {
    e.preventDefault()

  // Flips container holding all site content
    $('.flip-container-inner').css('transform', 'rotateY(180deg)')
  // Changes visiblity of front (Night Out) to hidden
    $('.flip-front').css('visibility', 'hidden')
  // Changes visibility of back (Night In) to visible
    $('.flip-back').css('backface-visibility', 'visible')
  })

  // Performs the opposite of event listener above
  $('#night-in-h1').on('click', (e) => {
    e.preventDefault()

    $('.flip-container-inner').css('transform', 'rotateY(0deg)')
    $('.flip-front').css('visibility', 'visible')
    $('.flip-back').css('backface-visibility', 'hidden')
  })


})
