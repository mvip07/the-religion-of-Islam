let map = document.querySelector("#map")
let geo = navigator.geolocation
geo.getCurrentPosition(function (position) {

    const {latitude, longitude} = position.coords
    map = L.map('map').setView([latitude, longitude], 15);
    console.log(latitude, longitude)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Where you are standing')
        .openPopup();
})