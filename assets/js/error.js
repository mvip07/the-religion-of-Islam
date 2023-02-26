export default function ERROR(WEATHER) {
	WEATHER.innerHTML = `
		<div class="error-section" id="error">
            <div class="error-section-top">
                <h2>404</h2>
                <h4>OOOPS! ERROR 404</h4>
                <h5>Sorry, But the page you are looking for does't exist!</h5>
            </div>
    
            <div class="page-not-found">
                <a href="index.html" class="btn">GO TO HOME PAGE</a>
            </div>
        </div>
	`
}