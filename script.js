const userMap = {
     //Grab user location
    userPosition: [],
    userLocalMap:  {},
    userMarker: {},
    locations: [],
    locationMarkers: {},

    initializeMap() {
        this.userLocalMap = L.map('map', {center: this.userPosition, zoom: 11,});
    
        // Add OpenStreetMap tiles:
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '10',
        }).addTo(this.userLocalMap)
    
        //Add user location marker
        const marker = L.marker(this.userPosition)
        marker.addTo(this.userLocalMap).bindPopup('<p1><b>Your are here</b></p1>').openPopup()
    },

    addBusinesLocations(){
        this.locations.forEach((location) => {
            userMap.locationMarkers = L.marker([location.lat, location.long])
            userMap.locationMarkers.addTo(userMap.userLocalMap).bindPopup(`<p1><b>${location.name}</b></p1>`).openPopup()
        })
    },


}

//Get user location 
async function getUserPosition(){
    let pos = await new Promise((resolve, reject) => {navigator.geolocation.getCurrentPosition(resolve, reject);});
    console.log(pos.coords)
    return [pos.coords.latitude, pos.coords.longitude]
}

//Wait for page load
window.onload = async () => {
    let coords = await getUserPosition()
    userMap.userPosition = coords
    userMap.initializeMap()
}

//Fetch Foursquare data via API
async function getFoursquareData(category){
    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: 'fsq3eRAeSflBeplmnMkHnAdQqcQJS8bvOIGgJXchlCZjE6g='
        }
    }
    let lat = userMap.userPosition[0]
    let long = userMap.userPosition[1]

    
    let response = await fetch(`https://api.foursquare.com/v3/places/search?ll=${lat}%2C${long}&radius=3000&query=${category}&limit=5`, options)
    let data = await response.json()
    let localBusinesses = data.results

    return localBusinesses
}


let locationButtons = document.querySelectorAll(".locationButton")
locationButtons.forEach((location) => { 
    location.addEventListener('click', async () => {
        let category = location.textContent;
        let selectionData = await getFoursquareData(category)
        
        selectionData.forEach((location) => {
            userMap.locations.push({name: location.name, lat: location.geocodes.main.latitude, long: location.geocodes.main.longitude})
        })
        userMap.addBusinesLocations()
 
    })
})



