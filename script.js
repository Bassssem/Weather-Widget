let weather = {
    "apikey": 'db36bac23c2f4e161a46a11c64fb9260',
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + this.apikey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const cityName = data.city.name;
        const forecastData = data.list.filter((item, index) => index % 8 === 0); // Get forecast for every 24 hours (3-day forecast)
        const forecastElement = document.querySelector(".forecast");

        forecastElement.innerHTML = ""; // Clear previous forecast data

        forecastData.forEach((item) => {
            const date = new Date(item.dt * 1000); // Convert timestamp to date object
            const day = date.toLocaleDateString("en-US", { weekday: "long" });
            const { icon, description } = item.weather[0];
            const { temp, humidity } = item.main;
            const { speed } = item.wind;

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
            <div classname='abc'>
                <h3>${day}</h3>
                <img src="https://openweathermap.org/img/wn/${icon}.png" class="icon">
                <div class="description">${description}</div>
                <div class="temp">${temp}°C</div>
                <div class="humidity">Humidity: ${humidity}%</div>
                <div class="wind">Wind speed: ${speed} km/h</div>
                </div>
            `;

            forecastElement.appendChild(forecastItem);
        });

        document.querySelector(".city").innerText = "Weather in " + cityName;
        document.querySelector(".weather").classList.remove("loading");
    }
};

weather.fetchWeather("tunisia");
