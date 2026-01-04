import "./style.css";

const searchcity = document.querySelector("#city-input");
const ButtonInput = document.querySelector("#button");
const NameCity = document.querySelector("#city-name");
const Dataof = document.querySelector("#Now-Data");
const Temperature = document.querySelector("#temp");
const HowWeather = document.querySelector("#weather-desc");
const ForecastContainer = document.querySelector("#forecast-container");
ButtonInput.addEventListener("click", async (e) => {
  e.preventDefault();
  let city = searchcity.value;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b5790119fb9348911556c28bacce7308`;
  const now = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  Dataof.textContent = now.toLocaleDateString("en-US", options);

  try {
    let response = await fetch(url);
    if (!response.ok) {
      if (response.status === 401) {
        alert("Неверный или неактивный API ключ");
        return;
      }
    }
    let data = await response.json();
    ForecastContainer.innerHTML = "";
    const forecastIndices = [8, 16];
    forecastIndices.forEach((number) => {
      let dayData = data.list[number];

      const date = new Date(dayData.dt * 1000);

      // --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
      // Мы добавляем месяц и число в настройки
      const fullDate = date.toLocaleDateString("en-US", { 
          weekday: "short", // День недели (Mon)
          month: "short",   // Месяц (Jan)
          day: "numeric"    // Число (5)
      });

      ForecastContainer.innerHTML += `
                <div class="forecast-card">
                <h4>${fullDate}</h4> <span>${Math.round(dayData.main.temp)}°C</span>
                <p>${dayData.weather[0].description}</p>
                </div>`;
    });
    NameCity.textContent = data.city.name;
    Temperature.textContent = Math.round(data.list[0].main.temp);
    HowWeather.textContent = data.list[0].weather[0].description;
    searchcity.value = "";
    console.log(data);
  } catch (error) {
    console.log("ошибка нет данных");
  }
});
