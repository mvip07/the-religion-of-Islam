const accordionCard = document.querySelector(".accordion");
fetch("http://api.alquran.cloud/v1/quran/quran-uthmani")
  .then((res) => res.json())
  .then((res) => {
    const ldsSpinner = document.querySelector(".lds-spinner");
    ldsSpinner.remove();
    const resData = res.data.surahs;
    ResData(resData);
  });

function ResData(resData) {
  for (let i of resData) {
    const contentBx = document.createElement("div");
    contentBx.classList = "contentBx";
    contentBx.innerHTML = `<div class="label">${i.englishName}</div>`;
    contentBx.addEventListener("click", () => {
      contentBx.classList.toggle("active");
    });

    for (let j of i.ayahs) {
      const content = document.createElement("div");
      content.classList = "content";
      content.innerHTML = `<p>${j.number}: ${j.text}</p>`;
      contentBx.append(content);
    }
    accordionCard.append(contentBx);
  }
}
