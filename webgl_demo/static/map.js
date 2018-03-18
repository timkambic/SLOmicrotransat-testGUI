jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAB65lY4mFWdKvRf7EjTbyxZwp_YLor30Y&callback=initialize";
    document.body.appendChild(script);
});
var map;
var bounds
var markers = [];
var gmarkers = [];

function initialize() {
    bounds = new google.maps.LatLngBounds();
          
    // Display a map on the page
    map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 80
        });	
    var sirina = document.getElementById("renderer").offsetWidth;
    document.getElementById("map_wrapper").style.height = '"'+sirina*0.75+'px"';  
	add_point();
}
 
function add_point(data){
		var latitude =data.lat;
		var longtitude = data.long;
		// Insert JavaScript code to operate on return data
		
		// console.log(latitude, longtitude);
		markers.push([latitude,longtitude]);
		// console.log(markers);

		if (markers.length > 20){ 
			markers.splice(0, 1);
			gmarkers[0].setMap(null);
			gmarkers.splice(0,1);
		}

		// Loop through our array of markers & place each one on the map  
		var marker ;
		i = markers.length -1;
		// console.log(i)
		var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
		bounds.extend(position);
		marker = new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP,
			//icon: getCircle(2000000)
		});
		gmarkers.push(marker);
		
		// Automatically center the map fitting all markers on the screen
		map.fitBounds(bounds);
		
		map.setCenter(marker.getPosition());
		//console.log(marker);
	
	

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    setTimeout(add_point, 5);
}
