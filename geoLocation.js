if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
			  	position: userLocation,
			    map: map
		   });
        });
 }