const apiKey = '5f76f9726c29cd10e4cc63f9820ebd40';
const url = 'https://api.openweathermap.org/data/2.5/weather?&appid=5f76f9726c29cd10e4cc63f9820ebd40&units=metric'

const apiaqi = 'aJSnDbo2NB4jLfPTBgMtEQ==4oXQbiXuGOfPW18e';
const urlaqi = 'https://api.api-ninjas.com/v1/airquality?X-Api-Key=aJSnDbo2NB4jLfPTBgMtEQ==4oXQbiXuGOfPW18e';

//created city variable...

let city ;
let generatehtml = ``;

document.querySelector('.js-button').addEventListener('click', () => {

    city = document.querySelector('.js-search').value
   // console.log(city)

    generatedata()
    document.querySelector('.js-search').value = ``;
   
});




async function generatedata() {
 
    try {
        //for weather API 
        const response = await fetch(url + `&q=${city}` );
        const reply = await response.json();

        console.log(reply);

        const temp = reply.main.temp;
        const hum = reply.main.humidity;
        const icon = reply.weather[0].main;
        const desc = (reply.weather[0].description).toUpperCase();
        const winds = (reply.wind.speed)  * 3.6;
        const name = (reply.name).toUpperCase();
        const feel = reply.main.feels_like;

        //for AQI API........

        const response2 = await fetch(urlaqi + `&city=${city}`)
        const reply2 = await response2.json();

        //console.log(reply2);

        const aqi = reply2.overall_aqi;
        

        //const temp = 

        generatehtml = `
            <img src="images/${icon}.png" class="weather-icon" >
            <h2 class="describe-border">${desc}</h2>
            <h1 class="temp">${(Math.round(temp)).toFixed(0)}°C</h1>
            <h3 class="city align-css">${name}</h3>
                
            <div class="details">

                <div class="col">
                    <img src="images/Humidity.png" >
                    <div>
                        <p class="humidity">${hum || `N.A.`}%</p>
                        <p>Humidity</p>
                    </div>
                </div>

                <div class="col">
                    <img src="images/Wind.png" >
                    <div>
                        <p class="wind">${(Math.round(winds)).toFixed(0) || `N.A.`} km/h</p>
                        <p>Windspeed</p>
                    </div>
                </div>

            </div>  
            
            <div class="details">

                <div class="col">
                    <img src="images/Aqi.png" >
                    <div>
                        <p class="aqi">${aqi || `N.A.`}</p>
                        <p>AQI</p>
                    </div>
                </div>

                <div class="col">
                    <img src="images/Temperature.png" >
                    <div>
                        <p class="feel">${feel || `N.A.`}°C</p>
                        <p>Feels like</p>
                    </div>
                </div>

            </div>
        `;
        
    } catch (error) {
       generatehtml = `
        <div class="ent-city">
            Check City Name & Try Again ! 
        </div>
       `; 
    }


document.querySelector('.weather').innerHTML = generatehtml;

}











