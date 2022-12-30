const BUTTON = document.querySelector('.btnSubmit')
BUTTON.addEventListener('click', () => {
	const NAME = document.querySelector('.name').value
	const SUBJECT = document.querySelector('.subject').value
	const EMAIL = document.querySelector('.email').value
	const MSG = document.querySelector('.msg').value

	if (NAME.trim() != "" && SUBJECT.trim() != "" && EMAIL.trim() != "" && MSG.trim() != "") {
		alert("Thank you writing. See you next time")
	} else alert("You are not writing")
})

let GEO = navigator.geolocation;
let map = document.querySelectorAll("#map");

GEO.getCurrentPosition(function (position) {
	const { latitude, longitude } = position.coords;
	map = L?.map("map").setView([latitude, longitude], 15);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	L.marker([latitude, longitude])
		.addTo(map)
		.bindPopup("Your address")
		.openPopup();
});


