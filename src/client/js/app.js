/* Trip form event Listener */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tripForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = {
      destination: event.target[0].value,
      date: event.target[1].value,
    };
    tripFormHandler(formData);
  });
});

/* Function to handle form input coming from event listener */
export const tripFormHandler = (formData) => {
  const tripInfo = {
    destination: formData.destination,
    date: formData.date,
  };
  getCoords(formData.destination)
    .then((coords) => {
      return getTripWeather(coords, formData.date);
    })
    .then((weatherInfo) => {
      tripInfo.weather = weatherInfo;
      return getDestImage(formData.destination);
    })
    .then((images) => {
      // If image search returned no results, use placeholder
      if (images.hits.length < 1) tripInfo.imageURL = './media/placeholder.png';
      else tripInfo.imageURL = images.hits[0].webformatURL;
      console.log(tripInfo);
      addTrip(tripInfo);
    });
};

// if less than 7 day away => getCurrentWeather(), else getWeatherForecast(date === tripDate)
const getTripWeather = (coords, tripDate) => {
  const weekDate = new Date();
  weekDate.setDate(weekDate.getDate() + 7);
  if (new Date(tripDate) <= weekDate) return getCurrentWeather(coords);
  else {
    return getForecastWeather(coords, tripDate);
  }
};
const getCoords = (cityName) => {
  const apiUser = 'fend_naif';
  return fetch(
    'http://api.geonames.org/searchJSON?q=' + cityName + '&username=' + apiUser,
  )
    .then((res) => res.json())
    .then((res) => {
      return {
        latitude: res.geonames[0].lat,
        longitude: res.geonames[0].lng,
        // country: res.geonames[0].countryName,
      };
    });
};

const getCurrentWeather = (coords) => {
  const apiKey = 'ecbf81b83784483fa128fe478cfe272d';
  return fetch(
    'https://api.weatherbit.io/v2.0/current?key=' +
      apiKey +
      '&lat=' +
      coords.latitude +
      '&lon=' +
      coords.longitude,
  )
    .then((res) => res.json())
    .then((currentWeather) => currentWeather.data[0].weather.description);
};

// Returns the exact forecasted weather of a specific day if it's within 16 days.
const getForecastWeather = (coords, tripDate) => {
  const apiKey = 'ecbf81b83784483fa128fe478cfe272d';
  return fetch(
    'https://api.weatherbit.io/v2.0/forecast/daily?key=' +
      apiKey +
      '&lat=' +
      coords.latitude +
      '&lon=' +
      coords.longitude +
      '&days=16',
  )
    .then((res) => res.json())
    .then((forecast) => {
      for (dayForecast of forecast.data) {
        if (dayForecast.valid_date === tripDate)
          return dayForecast.weather.description;
      }
      return 'No weather data for current date.';
    });
};
export const getDestImage = (destination) => {
  if (!destination) throw new Error('Destination not provided');

  const apiKey = '19032778-d80913ab37216642ffa2185cf';
  return fetch(
    'https://pixabay.com/api/?key=' + apiKey + '&q=' + destination,
  ).then((res) => res.json());
};

// Dynamically add trips to the page
const addTrip = (tripInfo) => {
  const tripsSection = document.getElementById('trips');
  const newTrip = document.createElement('div');
  newTrip.className = 'card mb-3';
  newTrip.innerHTML = `
  <img src="${tripInfo.imageURL}"class="card-img" alt="${tripInfo.destination}">
  <div class="card-body">
    <h5 class="card-title">${tripInfo.destination}</h5>
    <p class="card-text">${tripInfo.weather}</p>
    <p class="card-text">${tripInfo.date}</p>
  </div>
`;
  tripsSection.appendChild(newTrip);
};
