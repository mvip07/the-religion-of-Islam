/* BU qismda ob-havo vaqtlarini ko'rsati beruvchi code qismi*/
let geo = navigator.geolocation;
let apiBase = "https://api.openweathermap.org/data/2.5";
let apiKey = "de3ae2261305416619b29ff9f5edc781";
const Product = document.querySelector(".product__catagory");
geo.getCurrentPosition(function (position) {
  const { longitude, latitude } = position.coords;

  fetch(
    `${apiBase}/onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${apiKey}&units=metric`
  )
    .then((data) => data.json())
    .then((weather) => {
      let weatherDaily = weather.daily;

      for (let i of weatherDaily) {
        var dayname = new Date(i.dt * 1000).toLocaleDateString({ weekday: "" });

        const productCatagory = document.createElement("div");
        productCatagory.classList.add("product__catagory--single");

        const ProductContent = document.createElement("div");
        //ProductContent.classList.add("product__content product__content--catagory")
        ProductContent.innerHTML = `
                <p class="product__link">Sana: ${dayname}</p>
                <p class="product__link">Max: ${i.temp.max}</p>
                <span class="product__items--text">Min: ${i.temp.min}</span>
            `;

        const ProductImgBox = document.createElement("div");
        //ProductImgBox.classList.add("product__img-box product__img-box--catagory")
        ProductImgBox.innerHTML = `
                <p class="product__img--link">
                    <img class="product__img img-fluid" src="http://openweathermap.org/img/wn/${i.weather[0].icon}.png" alt="">
                    <p class="product__link">${i.weather[0].main}</p>
                </p>
            `;

        productCatagory.append(ProductContent, ProductImgBox);
        Product.append(productCatagory);
      }
    });
});

/* BU qismda namoz vaqtlarini ko'rsati beruvchi code qismi*/
const ProductBox = document.querySelector("#product-default-slider");
let today = new Date();
let month = `${today.getMonth() + 1 < 10 ? "0" : " "}${today.getMonth() + 1}`;
let year = `${today.getFullYear()}`;

geo.getCurrentPosition(function (position) {
  const { longitude, latitude } = position.coords;

  fetch(
    `http://api.aladhan.com/v1/calendarByAddress?address=%20${latitude},%20${longitude}&method=2&month=${month}&year=${year}/:splat 200!`
  )
    .then((response) => response.json())
    .then((prayer) => {
      let prayerDatas = prayer.data;

      for (let prayerData of prayerDatas) {
        const productContent = document.createElement("div");
        productContent.classList.add("product__box"),
          productContent.classList.add("product__default--single");
        productContent.innerHTML = `
            <div class="product__content">
                <p class="product__link">${prayerData.date.hijri.date}</p>
                <div class="product__price m-t-5">
                    <span class="product__price">${prayerData.date.readable}</span>
                </div>

                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                    <p class="product__link">Bomdod:</p>
                    <p class="product__link">${prayerData.timings.Fajr}</p>
                </div>

                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                    <p class="product__link">Quyosh chiqishi: </p>
                    <p class="product__link">${prayerData.timings.Sunrise}</p>
                </div>

                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                    <p class="product__link">Peshin:</p>
                    <p class="product__link">${prayerData.timings.Dhuhr}</p>
                </div>


                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                    <p class="product__link">Asr:</p>
                    <p class="product__link">${prayerData.timings.Asr}</p>
                </div>


                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                    <p class="product__link">Shom</p>
                    <p class="product__link">${prayerData.timings.Maghrib}</p>
                </div>

                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                    <p class="product__link">Quyosh botishi:</p>
                    <p class="product__link">${prayerData.timings.Sunset}</p>
                </div>

                <div class="product__times--time d-flex align-items-center justify-content-between p-1 mx-3">
                
                    <p class="product__link">Xufton:</p>
                    <p class="product__link">${prayerData.timings.Isha}</p>
                </div>
            </div>                        
            `;

        ProductBox.append(productContent);
      }
    });
});

let map = document.querySelectorAll("#map");
geo.getCurrentPosition(function (position) {
  const { latitude, longitude } = position.coords;
  map = L.map("map").setView([latitude, longitude], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([41.3264751, 69.2277542])
    .addTo(map)
    .bindPopup("Our headquarters")
    .openPopup();
});
