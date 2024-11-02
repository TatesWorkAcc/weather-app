const weatherForm = document.querySelector(".weatherForm");
// gets the weather form element id
const cityInput = document.querySelector('.cityInput');
// gets the text input from the user
const card = document.querySelector('.card');
// the border of the app
const apiKey = 'insert key here';
// weather api key from OpenWeatherMap

weatherForm.addEventListener("submit", async event => {
    // the arrow means to run this code. basically an if statement
    event.preventDefault();
    // makes it so when you run an event the page wont refresh
    const city = cityInput.value;
    
    if(city){
        // if city == true or if there is a city do this
        try{
            const weatherData = await getWeatherData(city)
            // will wait for the function to return the weather data
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.error(error);
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city");
    }
})
// when the submit button is pressed then an event will happenan

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl)

    if(!response.ok){
        // if console response was not okay. if it didnt retrieve the data
        throw new Error("Could not fetch weather data")
    }
    return await response.json()
}
// async function so that it can take its time to complete
function displayWeatherInfo(data){
    // gets the data from the api
    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    // main is the property in the data that is retrieved
    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")
    // creates elements for the data to get assigned to

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description
    weatherEmoji.textContent = getWeatherEmoji(id)
    // assigns the data to the elements that were just created

    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")
    // adds classes to the data so they can look good

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
    // adds the text and classes to the elements that were previously created
}
function getWeatherEmoji(weatherId){
    switch(true){
        // does the value of true match one of these cases
        // on the openweather api it gives values for what type of weather it is. when the value matches it will assign that emoji to the weatherEmoji
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️"
        case(weatherId >= 400 && weatherId < 400):
            return "🌧️"
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️"
        case(weatherId >= 600 && weatherId < 700):
            return "❄️"
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️"
        case(weatherId === 800):
            return "☀️"
        case(weatherId >= 800 && weatherId < 810):
            return "☁️"
        default:
            return ""
            
    }
}
function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    // adds a class to an element
    card.textContent = "";
    // will set text back to empty
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}