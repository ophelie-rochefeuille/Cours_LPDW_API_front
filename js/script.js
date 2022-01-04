
var MAP_API = {

//	http://api.aviationstack.com/v1/airports?access_key=5329f2889ae318c6a7114e7bc2f87cec
	AVIATION_API_URL: "http://localhost:8888/API/api/airports.php",

	map : null,
	airports: null,
	icon: null,
	valuesAdded: null,

	initMap : function () {
		this.buildMap();
		this.fetchData();
		this.prepareForm();
	},

	buildMap : function () {
		//create map 

		const paris = { 
			lat: 48.8534, 
			lng: 2.3488 
			};

			this.map = new google.maps.Map(document.getElementById("map"), {
				zoom: 5,
				center: paris,
			  });
		
			  this.map.setOptions({disableDoubleClickZoom: true})
	
	},

	fetchData : function () {
		// fetch data to API 
			fetch(this.AVIATION_API_URL)
			.then((response) => {
				return response.json()
			}).then(response => {
				this.airports = response
				this.appendElementToList()	
			})
			.catch(err => { 
				console.log(err)
			})
	},

	
	zoomMap: function (lat, lng) {
		//zoom map 
		this.map.setCenter({lat, lng});
		this.map.setZoom(12)
	},


	prepareForm: function () {
		// preparation form data 
		let form = document.querySelector('#form');
		let inputName = document.querySelector('#form input[name=name]');
		let inputLatitude = document.querySelector('#form input[name=latitude]');
		let inputLongitude = document.querySelector('#form input[name=longitude]');


		map.addEventListener('dblclick', function (){
			console.log('ok');
			form.style.display = "flex";
			form.style.position = "absolute";
			form.style.flexDirection = "column"
		})
		
		form.addEventListener("submit", event => {
			event.preventDefault();
			this.valuesAdded = {
				name: inputName.value, 
				latitude: inputLatitude.value, 
				longitude: inputLongitude.value
			}
			this.addAirport();
			form.style.display = "none"
		})
	},

	addAirport: function() {
		// Add airport in database 
		if(this.valuesAdded !== ""){

			var postMethod = {
				method: 'POST',
				mode: 'cors',
				headers: new Headers(),
				body: JSON.stringify(this.valuesAdded)
			};

			fetch(this.AVIATION_API_URL, postMethod)
			.then((response) => {
				return response.json()
			}).then((response) => {
				this.airports = response
				this.appendElementToList()
			})


		} else {
			console.log("error")
		}
		
	},


	deleteAirport: function(){
		//delete airport 
		var deleteMethod = {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers(),
            body: JSON.stringify(this.airports)
        };
		fetch(this.AVIATION_API_URL, deleteMethod)
		.then((response) => {
			return response.json()
		}).then(response => {
			console.log(response)
		})
	},

	
	updateAirport: function(){
		// update airport
		var updateMethod = {
			method: 'PUT',
			mode: 'cors',
			headers: new Headers(),
			body: JSON.stringify(this.valuesAdded)
		}
		fetch(this.AVIATION_API_URL, updateMethod)
	},


	displayInfoAirport: function(){
		//display informations of airports on click name
		const infowindow = new google.maps.InfoWindow({
			content: "Try to display info",
		  });
			infowindow.open({
			  anchor: marker,
			  map,
			  shouldFocus: false,
			})
	},


	appendElementToList : function ( airports ) {
		// Add element airport in map 
		this.airports.map(element => {

			let ul = document.querySelector('ul');
			let li = document.createElement('li');
			li.style.display =  "flex";
			li.style.flexDirection = "column"
			ul.appendChild(li);

			let deleteButton = document.createElement('button');
			deleteButton.innerHTML = " Delete";
			deleteButton.style.background = "none"
			deleteButton.style.border = "1px solid black"
			deleteButton.style.width = "100%"
			deleteButton.style.margin = "5px"

			let updateButton = document.createElement('button');
			updateButton.innerHTML = "Update";
			updateButton.style.background = "none"
			updateButton.style.border = "1px solid black"
			updateButton.style.width = "100%"
			updateButton.style.margin = "5px"
			
			deleteButton.addEventListener("click", event => {
				this.deleteAirport();
				console.log("Delete airport")
			})
			
			updateButton.addEventListener("click", event => {
				this.updateAirport();
				console.log("Updated airport")
			})

			let result = element.name;
			li.innerHTML = result;

			li.appendChild(deleteButton);
			li.appendChild(updateButton);
			
			let marker = {
				lat: Number(element.latitude),
				lng: Number(element.longitude)
			}
			let markerGoogle = new google.maps.Marker({
				position: marker, 
				map: this.map,
				icon: {
					url: "./img/plane.svg",
					anchor: new google.maps.Point(10,20),
					scaledSize: new google.maps.Size(20,20)
				}	
			  });

			const contentString = element.name + 
								'<br />' + 'Latitude: ' + 
								element.latitude + 
								'<br />' + 'Longitude: ' +
								element.longitude;

			const infowindow = new google.maps.InfoWindow({
				content: contentString,
			});

			  markerGoogle.addListener("click", () => {
					infowindow.open({
					  map,
					  shouldFocus: false,
					})
					
			  })
		})
	}
}

//var paris = { 
//	lat: 48.8534, 
//	lng: 2.3488 
// };