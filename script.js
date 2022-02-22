async function initializeMap(){
     //Grab user location
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })

    const myMap = L.map('map', {
        center: [pos.coords.latitude, pos.coords.longitude],
        zoom: 12,
    });

    // Add OpenStreetMap tiles:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap)
    
    const marker = L.marker([pos.coords.latitude, pos.coords.longitude])
    marker.addTo(myMap).bindPopup('<p1><b>Your Location</b></p1>').openPopup()


    return [pos.coords.latitude, pos.coords.longitude]
}

let user = initializeMap()




// Create map:   

let locationButtons = document.querySelectorAll(".locationButton")

locationButtons.forEach((location) => { 
    location.addEventListener('click', () => {
        console.log(location.textContent)
    })
})

    
   
    
    //Events for local coffee, restaurant, hotel, and market location buttons
    
    //Locate 5 nearest locations of interest near user location
    
    //Events for posted locations on map(research needed)



