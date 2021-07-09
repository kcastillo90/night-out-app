$(() => {

  // Night Out
  const $getRestaurants = (e) => {

    let $zip = $('input[type="text"]').val() // assigns zip to API URL

    if($zip === '') {
      alert("Please enter a valid zip code.")
      return
    }

    $.ajax({
      async: true,
      crossDomain: true,
      url: `https://documenu.p.rapidapi.com/restaurants/zip_code/${$zip}?size=30&fullmenu=false&page=1`,
      method: "GET",
      headers: {
        "x-api-key": "a5da2fb501238f04a7faea97564973b4",
        "x-rapidapi-key": "5afdaea20bmsh0c8158b162825e2p1ce46cjsnd2191c7b8519",
        "x-rapidapi-host": "documenu.p.rapidapi.com"
        }
      }).then(
        (results) => {
          console.log(results)

          console.log(results.data);

          for(i = 0; i < results.data.length; i++)  {
            const $restaurantDiv = $('<div>').attr(`id`, `${results.data[i].restaurant_name}`)
            const $restaurant = $('<dt>').attr(`id`, `${results.data[i].restaurant_name}`).text(`${results.data[i].restaurant_name}`)
            const $restaurantDetails = $('<dl>')
              const $cuisine = $('<dd>').text(`${results.data[i].cuisines}`).appendTo($restaurantDetails)
              const $priceRange = $('<dd>').text(`${results.data[i].price_range}`).appendTo($restaurantDetails)
              const $hours = $('<dd>').text(`${results.data[i].hours}`).appendTo($restaurantDetails)
              const $websiteDD = $('<dd>').appendTo($restaurantDetails)
              const $website = $('<a>').attr('href', `${results.data[i].restaurant_website}`).text(`${results.data[i].restaurant_website}`).appendTo($websiteDD)
              const $phone = $('<dd>').text(`${results.data[i].restaurant_phone}`).appendTo($restaurantDetails)
              const $address = $('<dd>').text(`${results.data[i].address.formatted}`).appendTo($restaurantDetails)
            $restaurantDiv.append($restaurant, $restaurantDetails)
            $('#restaurant_carousel').append($restaurantDiv)
          }
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
      })
  }         // End of get recipes function


  // Form submit to activate restaurant retrieval
  $('form').on('submit', (e) => {
    e.preventDefault()

    $('#zip_submitID').addClass('zip_submit_pressed')
    setTimeout(() => {
      $('#zip_submitID').removeClass('zip_submit_pressed')
    }, 150)


    $getRestaurants()

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

    // $('body').css('height', '')
    // $('body').css('height', 'auto')

    $getRecipes()

  })

  $('h1').on('click', (e) => {
    e.preventDefault()

    if($('.night-out-container').css('display') === 'flex') {

      $('.night-out-container').css('display', 'none')
      $('.night-in-container').css('display', 'flex')
      // $('body').css('height', '')
      // $('body').css('height', 'auto')

    } else{

      $('.night-in-container').css('display', 'none')
      $('.night-out-container').css('display', 'flex')
      // $('body').css('height', '')
      // $('body').css('height', '100vh')
    }
  })



})
