/* Trip form event Listener */
document.getElementById('tripForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {
    destination: event.target[0].value,
    date: event.target[1].value,
  };
  tripFormHandler(formData);
});

/* Function to handle form input coming from event listener */
const tripFormHandler = (formData) => {
  console.log(formData);
  getCoords(formData.destination).then((res) => {
    console.log(res);
  });
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
        country: res.geonames[0].countryName,
      };
    });
};
