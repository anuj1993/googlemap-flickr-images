            var lat = 0;
            var long = 0;

            $(document).ready(function () {
                
                $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14fca78b18f8e8f4d22216494ea29abf&user_id=136688117%40N05&has_geo=1&extras=geo&format=json&nojsoncallback=1", displayImages3);

                function displayImages3(data) {
                    //Loop through the results in the JSON array. The 'data.photos.photo' bit is what you are trying to 'get at'. i.e. this loop looks at each photo in turn.
                    $.each(data.photos.photo, function (i, item) {
                        //Read in the lat and long of each photo and stores it in a variable.
                        lat = item.latitude;
                        long = item.longitude;

                        //Get the url for the image.
                        var photoURL = "https://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                        htmlString = '<img src="' + photoURL + '" class="flickr-img">';
                        var contentString = '<div id="content">' + htmlString + "</div>";

                        //Create a new info window using the Google Maps API
                        var infowindow = new google.maps.InfoWindow({
                            //Adds the content, which includes the html to display the image from Flickr, to the info window.
                            content: contentString,
                        });

                        //Create a new marker position using the Google Maps API.
                        var myLatlngMarker = new google.maps.LatLng(lat, long);
                        var myTitle = "" + item.title;

                        //Create a new marker using the Google Maps API, and assigns the marker to the map created below.
                        var marker = new google.maps.Marker({
                            position: myLatlngMarker,
                            map: myMap,
                            title: item.title,
                        });

                        //Uses the Google Maps API to add an event listener that triggers the info window to open if a marker is clicked.
                        google.maps.event.addListener(marker, "click", function () {
                            infowindow.open(myMap, marker);
                        });
                    });
                }
            });
    
			
			