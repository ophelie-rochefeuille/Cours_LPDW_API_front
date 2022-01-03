
var MAP_API = {

	AVIATION_API_URL: "http://api.aviationstack.com/v1/airports?access_key=5329f2889ae318c6a7114e7bc2f87cec",

	map : null,
	airports: null,
	icon: null,
	/*icon = {
		url: "../img/plane.svg",
		anchor: new google.maps.Point(10,20),
		scaledSize: new google.maps.Size(20,20)
	},*/


	initMap : function () {

		this.buildMap();
		this.fetchData();
	},

	buildMap : function () {

		const paris = { 
			lat: 48.8534, 
			lng: 2.3488 
			};

			this.map = new google.maps.Map(document.getElementById("map"), {
				zoom: 4,
				center: paris,
			  });

			  const marker = new google.maps.Marker({
				position: paris,
				map: map,
			  });
		// TODO
		// initialiser la google map
	},

	fetchData : function () {
		
			fetch(this.AVIATION_API_URL)
			.then((response) => {
				
				const results = response.json()
				
				.then((json) => {
					this.airports  = json.data;
					this.appendElementToList()
				})
				
			})
			.catch(err => {
				console.log(err)
			})
	},

	

	zoomMap: function (lat, lng) {
		this.map.setCenter({lat:lat, lng:lng});
		this.map.setZoom(12)
	},

	appendElementToList : function ( airports ) {
		
		this.airports.forEach(element => {
			let ul = document.querySelector('ul');
			let li = document.createElement('li');
			ul.appendChild(li);
			let result = element.airport_name;
			console.log(element);
			li.innerHTML = result;
			li.addEventListener('click', this.zoomMap())
			let marker = {
				lat: Number(element.latitude),
				lng: Number(element.longitude)
			}
		
			console.log(marker);
			const markerGoogle = new google.maps.Marker({
				position: marker, 
				map: this.map,
				icon: {
					url: "./img/plane.svg",
					anchor: new google.maps.Point(10,20),
					scaledSize: new google.maps.Size(20,20)
				}
				
			  });

		})
	}
}

//var paris = { 
//	lat: 48.8534, 
//	lng: 2.3488 
// };