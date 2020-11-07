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
};
