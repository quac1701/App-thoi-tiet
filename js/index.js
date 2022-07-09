

const APP_ID = 'c56c89340d5aee5bf8eebffd308436f6';
const DEFAULT_VALUE = "";
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherIcon = document.querySelector('.weather-icon');
const weatherState = document.querySelector('.weather-state');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');


searchInput.addEventListener('change', (e)=>{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&appid=${APP_ID}`)
    .then (async res =>{
        const geo_data = await res.json();
        // console.log('Geo_data', geo_data);
        // console.log("toa do",geo_data[0].lat," ",geo_data[0].lon);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo_data[0].lat}&lon=${geo_data[0].lon}&units=metric&lang=vi&appid=${APP_ID}`)
        .then (async res=>{
            const data = await res.json();
            // console.log('weather_data', data);
            // console.log(data.weather[0].icon);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherIcon.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = (data.main.temp).toFixed(1) || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;

            // console.log(data.main.humidity);
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;            humidity.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed*3.6).toFixed(2) || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity|| DEFAULT_VALUE;
        });
    });
});

// microphone

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'vi-VI';
recognition.continuous = false;
const microphone = document.querySelector(' .microphone');

const handleVoice = (text) => {
    // console.log('text',text); 
    const handleText = text.toLowerCase();
    if (handleText.includes('thời tiết')){
        const location = handleText.split('tiết')[1].trim();
        // console.log(location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent); 
    }
}

microphone.addEventListener('click', (e)=>{
    e.preventDefault();
    recognition.start();
});

recognition.onspeechend = () =>{
    recognition.stop();
}

recognition.onerror = (err) =>{
    console.error(err);
}

recognition.onresult = (e) =>{
    // console.log ('onresult',e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}
