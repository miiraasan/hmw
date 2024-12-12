const apiKey = "326fc448165b58f5e1edf97184d92784"; // Замените на ваш API-ключ
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";



async function getWeather() {
    const city = document.getElementById("city").value;
    const weatherDiv = document.getElementById("weather");

    if (!city) {
        weatherDiv.innerHTML = "Введите название города!";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`);
        if (!response.ok) {
            throw new Error("Город не найден!");
        }

        const data = await response.json();
        updateBackground(data.weather[0].main);
        weatherDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Температура: ${data.main.temp}°C</p>
            <p>Погода: ${data.weather[0].description}</p>
            <p>Ветер: ${data.wind.speed} м/с</p>
        `;
    } catch (error) {
        weatherDiv.innerHTML = error.message;
    }
}

function updateBackground(weather) {
    if (weather === "Clear") {
        document.body.style.background = "linear-gradient(to bottom, #FFD700, #f0e68c)"; // Солнечная погода
    } else if (weather === "Rain") {
        document.body.style.background = "linear-gradient(to bottom, #708090, #778899)"; // Дождливая погода
    } else if (weather === "Clouds") {
        document.body.style.background = "linear-gradient(to bottom, #87CEEB, #f0f8ff)"; // Облачная погода
    } else if (weather === "Snow") {
        document.body.style.background = "linear-gradient(to bottom, #ADD8E6, #FFFFFF)"; // Снежная погода
    } else {
        document.body.style.background = "linear-gradient(to bottom, #000000, #434343)"; // Другая погода
    }
}
