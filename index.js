// Fetching the image from unsplashed

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => response.json())
  .then((data) => {
    let element = document.getElementById("background-image-container");
    console.log(element);
    element.style.height = `${window.innerHeight}px`;

    element.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By ${data.user.name}`;
  })
  .catch((error) => {
    console.error(error);
  });

// Fetching cryptocurrency data

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
    `;
    document.getElementById("crypto-bottom").innerHTML = `
            <p>🎯: $${data.market_data.current_price.usd}</p>
               <p>👆: $${data.market_data.high_24h.usd}</p>
                  <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((error) => console.error(error));

// Timestamp

function currentTimeStamp() {
  let date = new Date();
  let options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    options
  );
}

setInterval(currentTimeStamp, 1000);

// Fetching Weather Data

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} /> 
        <p class = "weather-temp"> ${Math.round(data.main.temp)}º</p>
        <p class = "weather-city">${data.name}</p>
     `;
    })
    .catch((err) => console.error(err));
});
