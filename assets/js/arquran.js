const basUrl = "http://api.alquran.cloud/v1/quran"
const acardion = document.querySelector(".accordion")
fetch(`${basUrl}/quran-uthmani`)
    .then((data) => data.json())
    .then(data => {
        const quran = data?.data?.surahs
        for (let items = 0; items < 114; items++) {
            const div = document.createElement("div")
            div.innerHTML = `
                      <div class="contentBx">
                            <div class="label">${quran[items]?.name}</div>
                            <div class="content">
                                <b>${quran[items]?.number}</b>
                                
                                    ${
                                        quran[items]?.ayahs?.map(({text}) => 
                                            `<p>${text}</p>`
                                            )
                                    }
                            </div>
                      </div>
                  `
            acardion.append(div)            
        }

        const contentBx = document.querySelectorAll(".contentBx")
        for (let i = 0; i < contentBx.length; i++) {
            contentBx[i].addEventListener('click', function () {
                this.classList.toggle("active")
            })
        }
    })






