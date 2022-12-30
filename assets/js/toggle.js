const TOGGLEOPEN = document.querySelector(".offcanvas-toggle")
const OFFCANVAS = document.querySelector(".offcanvas")
TOGGLEOPEN.addEventListener("click", () => {
	if (OFFCANVAS.className != "offcanvas active") {
		OFFCANVAS.classList += " active"
	}
})

const TOGGLECLOSE = document.querySelector(".offcanvas-close")

TOGGLECLOSE.addEventListener("click", () => {
	OFFCANVAS.classList.remove("active")
})
