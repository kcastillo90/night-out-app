$(() => {

  const $getRestaurants = (e) => {

    let $zip = $('input[type="text"]').val() // assigns zip to API URL

    if($zip === '') {
      alert("Please enter a valid zip code.")
      return
    }

    // $.ajax({
    //   async: true,
    //   crossDomain: true,
    //   url: `https://documenu.p.rapidapi.com/restaurants/zip_code/${$zip}?size=30&fullmenu=false&page=2`,
    //   method: "GET",
    //   headers: {
    //     "x-api-key": "a5da2fb501238f04a7faea97564973b4",
    //     "x-rapidapi-key": "5afdaea20bmsh0c8158b162825e2p1ce46cjsnd2191c7b8519",
    //     "x-rapidapi-host": "documenu.p.rapidapi.com"
    //     }
    //   }).then(
    //     (results) => {
    //       console.log(results)
    //
    //       console.log(results.data);
    //
    //       for(i = 0; i < results.data.length; i++)  {
    //         const $restaurantDiv = $('<div>').attr(`id`, `${results.data[i].restaurant_name}`)
    //         const $restaurant = $('<dt>').attr(`id`, `${results.data[i].restaurant_name}`).text(`${results.data[i].restaurant_name}`)
    //         const $restaurantDetails = $('<dl>')
    //           const $cuisine = $('<dd>').text(`${results.data[i].cuisines}`).appendTo($restaurantDetails)
    //           const $priceRange = $('<dd>').text(`${results.data[i].price_range}`).appendTo($restaurantDetails)
    //           const $hours = $('<dd>').text(`${results.data[i].hours}`).appendTo($restaurantDetails)
    //           const $website = $('<dd>').text(`${results.data[i].restaurant_website}`).appendTo($restaurantDetails)
    //           const $phone = $('<dd>').text(`${results.data[i].restaurant_phone}`).appendTo($restaurantDetails)
    //           const $address = $('<dd>').text(`${results.data[i].address.formatted}`).appendTo($restaurantDetails)
    //         $restaurantDiv.append($restaurant, $restaurantDetails)
    //         $('#restaurant_carousel').append($restaurantDiv)
    //       }
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
            console.log('next button has been clicked!');
            $restaurantsTotal.eq($currentRestaurant).css('display', 'none')
            if($currentRestaurant < $numOfRestaurants) {
              $currentRestaurant++
            } else {
              $currentRestaurant = 0
            }

            $restaurantsTotal.eq($currentRestaurant).css('display', 'block')

          })

          $('#prev').on('click', () => {
            console.log('previous button has been clicked!');
            $restaurantsTotal.eq($currentRestaurant).css('display', 'none')
            if($currentRestaurant > 0) {
              $currentRestaurant--
            } else {
              $currentRestaurant = $numOfRestaurants
            }

            $restaurantsTotal.eq($currentRestaurant).css('display', 'block')

          })


      // })



  }



  $('form').on('submit', (e) => {
    e.preventDefault()

    $getRestaurants()
  })





})
