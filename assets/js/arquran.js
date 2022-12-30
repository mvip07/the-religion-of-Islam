import ERROR from "./error.js"
import LOADER from "./loader.js"
const BASURL = "http://api.alquran.cloud/v1/quran"
const ACARDION = document.querySelector(".accordion")

if (!localStorage.getItem("alQuran_book")) {
    fetch(`${BASURL}/quran-uthmani`)
        .then((data) => data.json())
        .then((data) => { QURANFUNCTION(data?.data?.surahs); LOADER() })
        .catch((err) => { ERROR(ACARDION); LOADER() })
} else {
    QURANFUNCTION(JSON.parse(localStorage.getItem("alQuran_book"))); LOADER()

}

function QURANFUNCTION(QURANRES) {
    localStorage.setItem("alQuran_book", JSON.stringify(QURANRES))
    for (let QURANITEMS = 0; QURANITEMS < 114; QURANITEMS++) {
        const CONTENTBOX = document.createElement("div")
        CONTENTBOX.innerHTML = `
        <div class="contentBx">
            <div class="label">${QURANRES[QURANITEMS]?.name}</div>
            <div class="content">
                <b>${QURANRES[QURANITEMS]?.number}</b>
                ${
                    QURANRES[QURANITEMS]?.ayahs.map(({ text }) => `<span>${text}</span>`)
                }
            </div >
            </div >
    `
        ACARDION.append(CONTENTBOX)
    }
    CLICK()
}

function CLICK() {
    const CONTENTBOX = document.querySelectorAll(".contentBx")
    for (let i = 0; i < CONTENTBOX.length; i++) {
        CONTENTBOX[i].addEventListener('click', function () {
            this.classList.toggle("active")
        })
    }
}