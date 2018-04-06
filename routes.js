function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
    		origin: {
        		lat: 17.401221, 
        		lng: 78.560211
   			},
    		destination: {
      			lat: 17.368227,
      			lng: 78.527245
    		},
    		travelMode: google.maps.TravelMode.DRIVING,
    		provideRouteAlternatives:true
  		}, 	function(response, status) {
    			if (status === google.maps.DirectionsStatus.OK) {
      				directionsDisplay.setOptions({
        				directions: response,
      				})
      				renderDirectionsPolylines(response, map);
    			} 
    			else {
      				window.alert('Directions request failed due to ' + status);
    			}
    		}
    	);

	}
	

	function renderDirectionsPolylines(response) {

  		var bounds = new google.maps.LatLngBounds();

		for (var i = 0; i < polylines.length; i++) {
		    polylines[i].setMap(null);
		}


		for(index=0;index<response.routes.length;index++)
		{
			console.log("routes length is ",response.routes.length)
			var legs = response.routes[index].legs;
			for (i = 0; i < legs.length; i++) {
				var steps = legs[i].steps;
				for (j = 0; j < steps.length; j++) {
					console.log("steps length is ",steps.length)
					
		  			var intermediatePoints= steps[j].path;
		  			var stepPolyline = new google.maps.Polyline(polylineOptions);
		  			stepPolyline.setOptions({

		    				strokeColor: colors[j%6]
					})
			      	for (k = 0; k < intermediatePoints.length; k++) {
			       		stepPolyline.getPath().push(intermediatePoints[k]);
			        	bounds.extend(intermediatePoints[k]);
			      	}
		  			polylines.push(stepPolyline);
		  			stepPolyline.setMap(map);
				}
		 	}
		 	map.fitBounds(bounds);
 	 	}

	}