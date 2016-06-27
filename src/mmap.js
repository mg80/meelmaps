mmap();
function mmap() {
	var mmap = this.mmap = {};
	google.maps.event.addDomListener(window, "load", function () {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: new google.maps.LatLng(33.808678, -117.918921),
			zoom: 4,
			mapTypeId: google.maps.MapTypeId.HYBRID
		});

		var geocoder = new google.maps.Geocoder();

		this.mmap.codeAddress = function (address) {
			geocoder.geocode({'address': address}, function (results, status) {
				if (results.length !== 1)
					return mmap.listSuggestions(results);

				mmap.addMarker(results[0].geometry.location);
				mm().addLocation(JSON.stringify(results[0].geometry.location), results[0].formatted_address);
				mmap.paintLocationOnList(results[0].formatted_address);
			}.bind(this));
		};

		this.mmap.addMarker = function (mark) {
			map.setCenter(mark);
			var marker = new google.maps.Marker({
				map: map,
				position: mark
			});
			google.maps.event.addListener(marker, 'click', function () {
				$('#myModal').modal('show');
			});
		};

		this.mmap.listSuggestions = function (suggestions) {
			var suggestionsTemplate = document.getElementById('suggestions');
			var suggestionsDiv = document.createElement('div');
			for (var i = 0, l = suggestions.length; i < l; i++) {
				var suggestionSpan = document.createElement('span');
				var button = document.createElement('button');
				suggestionSpan.innerHTML = suggestions[i].formatted_address;
				button.setAttribute('latlong', JSON.stringify(suggestions[i].geometry.location));
				button.setAttribute('onclick', 'mmap.addMarker(JSON.parse(this.getAttribute("latlong")))');
				suggestionSpan.appendChild(button);
				suggestionsDiv.appendChild(suggestionSpan);
				suggestionsDiv.appendChild(document.createElement('br'));
			}
			suggestionsTemplate.appendChild(suggestionsDiv);
			document.getElementById('container').className = 'col-lg-8';

		};

		mm().getLocations().then(function (locations) {
			for (var i in locations) {
				mmap.addMarker(JSON.parse(i));
				mmap.paintLocationOnList(locations[i].displayValue);
			}
		});

		this.mmap.paintLocationOnList = function (display) {
			//var button = document.createElement('div');
			//button.setAttribute('type', 'button');
			//button.setAttribute('class', 'btn glyphicon glyphicon-fullscreen');
			//button.setAttribute('data-toggle', 'modal');
			//button.setAttribute('data-target', '#myModal');
			var locationTemplate = document.getElementById('locations');
			var location = document.createElement('li');
			location.setAttribute('class', 'location list-group-item');
			location.innerHTML = display;
			location.setAttribute('type', 'button');
			location.setAttribute('data-toggle', 'modal');
			location.setAttribute('data-target', '#myModal');
			locationTemplate.appendChild(location);

		};
	}.bind(this));

	return mmap;
}