import ERROR from "./error.js"
import LOADER from "./loader.js"
const APIBASE = "https://api.openweathermap.org/data/2.5";
const APIBASEPRAYER = "http://api.aladhan.com/v1/calendar/"
const APIKEY = "de3ae2261305416619b29ff9f5edc781";
const GEO = navigator.geolocation;
const WEATHER = document.querySelector(".weather__catagory");
// http://api.aladhan.com/v1/calendar/ http://api.aladhan.com/v1/calendar/2019?latitude=51.508515&longitude=-0.1254872&method=2
let TODAY = new Date();
let MONTH = `${TODAY.getMonth() + 1 < 10 ? "0" : " "}${TODAY.getMonth() + 1}`;
let YEARS = `${TODAY.getFullYear()}`;
const PRAYER = document.querySelector(".prayer-default-slider");
const SELECT = document.querySelector(".select")

GEO.getCurrentPosition(function (position) {
	const { longitude, latitude } = position.coords;

	fetch(`${APIBASE}/onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${APIKEY}&units=metric`)
		.then((data) => data.json())
		.then((weather) => { WEATHERFUNCTION(weather.daily); LOADER() })
		.catch(err => { ERROR(WEATHER);  LOADER()})

	fetch(`${APIBASEPRAYER}${YEARS}/${MONTH}?latitude=${latitude}&longitude=${longitude}&method=2`)
		.then((response) => response.json())
		.then((prayer) => { PRAYERFUNCTION(prayer.data); CHOOSEBUTTON(prayer.data); SELECTDATEFUNCTION(prayer.data); LOADER() })
		.catch(err => { ERROR(PRAYER); LOADER() })
})

function WEATHERFUNCTION(WEATHERRES) {
	for (let i of WEATHERRES) {
		var DAYNAME = new Date(i.dt * 1000).toLocaleDateString({ weekday: "" });

		const WEATHERCATEGORY = document.createElement("div")
		WEATHERCATEGORY.classList.add("weather__catagory--single");

		const WEATHERLINKS = document.createElement("div");
		WEATHERLINKS.innerHTML = `
			<p class="weather__link">Date: ${DAYNAME}</p>
			<p class="weather__link">Max: ${i.temp.max}</p>
			<p class="weather__link">Min: ${i.temp.min}</p>
        `;

		const WEATHERIMAGES = document.createElement("div");
		WEATHERIMAGES.innerHTML = `
			<p class="weather__img--link">
				<img class="weather__img" src="http://openweathermap.org/img/wn/${i.weather[0].icon}.png" alt="">
				<p class="weather__link">${i.weather[0].main}</p>
			</p>
        `;

		WEATHERCATEGORY.append(WEATHERLINKS, WEATHERIMAGES);
		WEATHER.append(WEATHERCATEGORY);
	}
}

function PRAYERFUNCTION(PRAYERRES) {
	PRAYER.innerHTML = ""
	for (let i of PRAYERRES) {
		let PRAYERDEFAULT = document.createElement("div")
		PRAYERDEFAULT.classList.add("prayer__default--single")
		PRAYERDEFAULT.innerHTML = `
			<div class="prayer__date">
				<p class="prayer__link">${i?.date.hijri.date}</p>
				<span class="prayer__price">${i?.date.readable}</span>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Fajr:</p>
				<p class="prayer__link">${i?.timings.Fajr}</p>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Sunrise: </p>
				<p class="prayer__link">${i?.timings.Sunrise}</p>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Dhuhr:</p>
				<p class="prayer__link">${i?.timings.Dhuhr}</p>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Asr:</p>
				<p class="prayer__link">${i?.timings.Asr}</p>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Maghrib</p>
				<p class="prayer__link">${i?.timings.Maghrib}</p>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Sunset:</p>
				<p class="prayer__link">${i?.timings.Sunset}</p>
			</div>

			<div class="prayer__times">
				<p class="prayer__link">Isha:</p>
				<p class="prayer__link">${i?.timings.Isha}</p>
			</div>
	`;
		PRAYER.appendChild(PRAYERDEFAULT);
	}
}

function CHOOSEBUTTON(PRAYERRES) {
	const TODAYBTN = document.querySelector(".today")
	const MONTH = document.querySelector(".month")

	TODAYBTN.addEventListener("click", () => {
		const DAY = new Date().getUTCDate()
		PRAYERRES.filter((ITEMS) => (ITEMS.date.readable).substr(0, 2) == DAY ? PRAYERFUNCTION([ITEMS]) : "")
	})

	MONTH.addEventListener("click", () => PRAYERFUNCTION(PRAYERRES))

	SELECT.addEventListener("input", ({ target }) => {
		PRAYERRES.filter((ITEMS) => ITEMS.date.readable == target.value ? PRAYERFUNCTION([ITEMS]) : "")
	})
}

function SELECTDATEFUNCTION(PRAYERRES) {
	for (let i of PRAYERRES) {
		const OPTIONBOX = document.createElement("option")

		OPTIONBOX.innerHTML = `${i.date.readable}`
		OPTIONBOX.classList.add((i.date.readable).substr(0, 2))

		SELECT.append(OPTIONBOX)
	}
}