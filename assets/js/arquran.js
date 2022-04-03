const accordionCard = document.querySelector(".accordion");
fetch("http://api.alquran.cloud/v1/quran/quran-uthmani")
  .then((res) => res.json())
  .then((res) => {
    const ldsSpinner = document.querySelector(".lds-spinner");
    ldsSpinner.remove();
    const data = res.data.surahs;
    for (let i of data) {
      const ayahs = i.ayahs;
      const contentBx = document.createElement("div");
      contentBx.classList = "contentBx";
      contentBx.innerHTML = `<div class="label">${i.englishName}</div>`;
      contentBx.addEventListener("click", () => {
        contentBx.classList.toggle("active");
      });
      for (let j of ayahs) {
        const content = document.createElement("div");
        content.classList = "content";
        content.innerHTML = `<p>${j.text} :${j.number}</p>`;
        contentBx.append(content);
      }
      accordionCard.append(contentBx);
    }
  });
