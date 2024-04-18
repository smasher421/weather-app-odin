// Write the functions that hit the API.
//You’re going to want functions that can take a location and return the weather data for that location. 
//For now, just console.log() the information.


async function getAPI(location) {//location asta tre sa fie un getElementById, probabil dintr-un input form de tip search

    const apiKey = '30e650d22458450bbb6123353241604';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;


    // const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=30e650d22458450bbb6123353241604&q=${location}`, {mode: 'cors'});
    // const weatherData = await response.json();
    // console.log(weatherData);

    try{
        const response = await fetch(apiUrl, {mode: 'cors'});
        if(!response.ok){
            throw new Error('Failed To Fetch WeatherAPI Data');
        }

        const weatherData = await response.json();
        return weatherData; //dupa ce am returnat asta, va fi procesat mai jos
    } catch (error){
        console.error("Error Fetching Weather Data: ", error.message);
        return null;
    }
}


function processWeatherData(weatherData){ //functia asta ia obiectul weatherData returnat mai sus si ma ajuta sa returnez un obiect doar cu valori de
                                                                                                                                        //care am nev
    if(!weatherData || !weatherData.current){
        return null;
    }
    const { temp_c, temp_f, humidity, wind_kph } = weatherData.current;
    const location = weatherData.location.name;
    
    return {
        temperatureCelsius: temp_c,
        temperatureFahrenheit: temp_f,
        humidity,
        windSpeedKph: wind_kph,
        location
        //asta e obiectul prin care returnez procesarea datelor din API
    };

    }




// getAPI('Roman')
// .then(weatherData => {
//     console.log(weatherData);
//     //teoretic aici ar trb sa procesez diferite chestii din API adica vreme, lat, long, id, etc etc
//     const processedData = processWeatherData(weatherData);
//     if(processedData){
//         console.log(processedData); //aici dau un console.log la returnul de mai sus practic
//     }
//     else{
//         console.error('Invalid Data Received');
//     }
// })
// .catch(error => {console.log('Error:', error);
// }); //practic aici se term procesarea datelor din API conform cu obiectul pe care l-am creat din return

// /* Set up a form that will let users input their location
// and will fetch the weather info (still just console.log() it). */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('weatherForm');
    const weatherInfoContainer = document.getElementById('weatherInfo')

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const location = document.getElementById('searchLocation').value;
        try {
            const weatherData = await getAPI(location);
            console.log(weatherData);
            const processedData = processWeatherData(weatherData);
            if (processedData) {
                displayWeatherData(processedData, weatherInfoContainer);
                console.log(processedData);
            } else {
                console.error('Invalid weather data received');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


//Display the information on your webpage!


function displayWeatherData(weatherData, container){
    container.innerHTML = `
    <h2>Weather Information for ${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperatureCelsius} °C (${weatherData.temperatureFahrenheit} °F)</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Wind Speed: ${weatherData.windSpeedKph} km/h</p>
    `
}

//styling will be defined in a CSS 