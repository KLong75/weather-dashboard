var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=523a8452a92059fd3b4bc789dcceccb3"
fetch(apiUrl)
      .then(function(response) {
        // request was succesful
        if (response.ok) {
          console.log(response); 
          response.json().then(function(data) {
          });
        } else {
        alert("Error");
        }
      })
      .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect");
      });