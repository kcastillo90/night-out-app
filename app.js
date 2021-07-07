$(() => {

  let $zip = '19130'  // temp
  // let $zip = $('input[type="text"]').val() // setup for submit

  $.ajax({
    async: true,
    crossDomain: true,
    url: `https://documenu.p.rapidapi.com/restaurants/zip_code/${$zip}?size=30&fullmenu=false&page=2`,
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
            const $website = $('<dd>').text(`${results.data[i].restaurant_website}`).appendTo($restaurantDetails)
            const $phone = $('<dd>').text(`${results.data[i].restaurant_phone}`).appendTo($restaurantDetails)
            const $address = $('<dd>').text(`${results.data[i].address.formatted}`).appendTo($restaurantDetails)
          $restaurantDiv.append($restaurant, $restaurantDetails)
          $('#restaurant_carousel').append($restaurantDiv)
          }

        })


      })





// })
