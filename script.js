const apiKey = 'd7db451187ac48b4bd7130555242305';
const cityName = 'Guardinha';
const apiUrlCurrent = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=pt`;
const apiUrlWeatherForecast = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&lang=pt`;
// const apiUrlCity = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}&lang=pt`;
const cacheWeatherForecastKey = 'forecastData'
const cacheKey = 'weatherData';
// const cacheExpiry = 3600000; // 1 hour in milliseconds
const cacheExpiry = 3600000; // 1 hour in milliseconds

let city = document.getElementById("city")
let temperature = document.getElementById("temperature")
let status = document.getElementById("status")
let wet = document.getElementById("wet")
let precip_in = document.getElementById("precip_in")
let last_updated = document.getElementById("last_updated")
let threeDays = document.getElementsByClassName("threeDays")

let cloudy = [
  "Parcialmente nublado",
  "Nublado",
  "Encoberto",
  "Neblina",
  "Nevoeiro",
"Nevoeiro gelado"
]

let rainy = [
  "Chuvisco irregular",
  "Chuvisco",
  "Chuvisco gelado",
  "Chuvisco forte gelado",
  "Chuva fraca irregular",
  "Chuva fraca",
  "Períodos de chuva moderada",
  "Chuva moderada",
  "Períodos de chuva forte",
  "Chuva forte",
  "Chuva fraca e gelada",
  "Chuva gelada moderada ou forte",
  "Aguaceiros fracos",
  "Aguaceiros moderados ou fortes",
  "Possibilidade de chuva irregular"
]

let snowy = [
  "Possibilidade de neve irregular",
  "Chuva fraca com neve",
  "Chuva forte ou moderada com neve",
  "Queda de neve irregular e fraca",
  "Queda de neve fraca",
  "Queda de neve moderada e irregular",
  "Queda de neve moderada",
  "Aguaceiros fracos com neve",
]

let blizzard =[
  "Queda de neve forte e irregular",
  "Nevasca",
  "Neve intensa"
]

let rainySnowy=[
  "Possibilidade de neve molhada irregular",
  "Possibilidade de chuvisco gelado irregular",
  "Rajadas de vento com neve",
  "Aguaceiros moderados ou fortes com neve",
  "Chuva fraca com neve",
  "Chuva moderada ou forte com neve",
  "Neve fraca irregular com trovoada",
  "Neve moderada ou forte com trovoada"
]

let storm=[
  "Possibilidade de trovoada",
  "Chuva torrencial",
  "Granizo",
  "Chuva fraca irregular com trovoada",
  "Chuva moderada ou forte com trovoada",
  "Aguaceiros fracos com granizo",
"Aguaceiros moderados ou fortes com granizo"
]

console.log(threeDays[0])

async function fetchWeatherData() {
      fetch(apiUrlCurrent)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        //   displayWeatherData(data);
            
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
    }


// console.log("A")


async function getWeatherData() {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheExpiry) {
      console.log('✅ Using cached data');
      console.log(data.location.name);
      console.log(data.location.region);
      console.log(data.location.country);

      console.log(data.current.condition.text)
      console.log(data.current.feelslike_c +" ºC")

      city.innerHTML = data.location.name

      temperature.innerHTML = data.current.temp_c +"ºC"

      status.innerHTML = data.current.condition.text

      wet.innerHTML = data.current.humidity+"%"

      precip_in.innerHTML = data.current.precip_in+"%";

      last_updated.innerHTML = data.current.last_updated.split(' ')[1]


      console.log(data)
      return;
    }
  }
  console.log('🔄 Fetching new data');
  fetchWeatherData();
}




async function fetchWeatherForecast() {
  fetch(apiUrlWeatherForecast)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem(cacheWeatherForecastKey, JSON.stringify({ data, timestamp: Date.now() }));
    //   displayWeatherData(data);
        
    console.log(data)
    
  })
  .catch(error => console.error('Error:', error));


}


async function getForecastData() {
  let nextDays="";
  let nextCondition;
  let iconCondition;

  const cachedData = localStorage.getItem(cacheWeatherForecastKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheExpiry) {
      console.log('✅ Using cached data');
      for (let index = 0; index < data.forecast.forecastday.length; index++) {
        console.log(brazilianDate(data.forecast.forecastday[index].date))
        console.log(data.forecast.forecastday[index].day.condition.text)
        console.log(data.forecast.forecastday[index].day.avgtemp_c + "ºC")

        let dayCondition = (data.forecast.forecastday[index].day.condition.text)

        if(rainy.includes(dayCondition)){
          nextCondition = "Chuva"
          iconCondition = `<span class="material-symbols-outlined">
          rainy
          </span>`
        }

        if(storm.includes(dayCondition)){
          nextCondition = "Tempestade"
          iconCondition = `<span class="material-symbols-outlined">
          thunderstorm
          </span>`
        }

        if(snowy.includes(dayCondition)){
          nextCondition = "Neve"
          iconCondition = `<span class="material-symbols-outlined">
          cloudy_snowing
          </span>`
        }

        if(rainySnowy.includes(dayCondition)){
          nextCondition = "Chuva com neve"
          iconCondition = `<span class="material-symbols-outlined">
          rainy_snow
          </span>`
        }

        if(cloudy.includes(dayCondition)){
          nextCondition = "Nublado"
          iconCondition = `<span class="material-symbols-outlined">
          cloud
          </span>`
        }

        if(blizzard.includes(dayCondition)){
          nextCondition = "Nevasca"
          iconCondition = `<span class="material-symbols-outlined">
          snowing_heavy
          </span>`
        }
      

        if(dayCondition.includes("Sol")){
          nextCondition = "Sol"
          iconCondition = `<span class="material-symbols-outlined">
          sunny
          </span>`
        }

        if(dayCondition.includes("Céu limpo")){
          nextCondition = "Céu limpo"
          iconCondition =  `<span class="material-symbols-outlined">
          clear_night
          </span>`
        }

        nextDays+= 
        `<div class="nextsDays">
        <span>${brazilianDate(data.forecast.forecastday[index].date)}</span>
        <span>${iconCondition}</span>
        <span>${(data.forecast.forecastday[index].day.avgtemp_c + "ºC")}</span>
        <span>${(nextCondition)}</span>
        </div>`
        

        

        
      }
      threeDays[0].innerHTML= nextDays
   
      console.log(data)

      return;
    }
  }
  console.log('🔄 Fetching new data');
  fetchWeatherForecast();
}

getWeatherData();
getForecastData();


function brazilianDate(date) {
  // Cria um objeto Date a partir da string de data
  // console.log("A data: "+ date)
  // const dateObj = new Date(date);
  
  // Extrai o dia, mês e ano do objeto Date
  const day = date.slice(-2)
  
  const month = date.slice(5,7) 

  const year = date.slice(0,4)
  
  // Retorna a data formatada no padrão brasileiro
  return `${day}/${month}`;
}
/*
async function fetchCityData() {
      fetch(apiUrlCity)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        //   displayWeatherData(data);
            
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
    }


// console.log("A")

async function geCityData() {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheExpiry) {
      console.log('Using cached data');
      // console.log(data);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element.name, ",", element.region, "-",element.country)
        console.log(element)
      }

      return;
    }
  }
  console.log('Fetching new data');
  fetchCityData();
}

geCityData();
*/







// // Nome da cidade que você está procurando

// // Montar a URL com a chave de API e o nome da cidade
// const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(cityName)}&language=pt-BR`;

// // Função para fazer o fetch e tratar a resposta
// async function fetchCityData() {
//     try {
//         const response = await fetch(url);
        
//         // Verificar se a resposta é bem-sucedida
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        
//         const data = await response.json();
        
//         // Exibir os dados no console (ou tratar como necessário)
//         console.log(data);

//         console.log((data).length)

        

//         console.log('Termo pesquisado: "', cityName, '"')
//         console.log("Quantidade de resultados encontrados: ", data.length)
//         for (let index = 0; index < data.length; index++) {
//             const element = data[index];
            
//             if(element != undefined){
//                 console.log(element.LocalizedName, ",",element.AdministrativeArea.LocalizedName, "- ",element.Country.LocalizedName)
//             }
            
//             // console.log(element)
//             // let cidade = element.ParentCity
//             // console.log(cidade)
//             // for (let index = 0; index < cidade.length; index++){

//             // }
            
//         }

        

//         // console.log(data[0].Key)

//     } catch (error) {
//         console.error('Fetch error: ', error);
//     }
// }

// // Chamar a função para executar a requisição
// var dados = document.getElementById("dados")


// dadosAPI = fetchCityData();

// async function forecast() {
//     const ID = 34158
//     const urlCurrentConditions = `http://dataservice.accuweather.com/currentconditions/v1/${encodeURIComponent(ID)}?apikey=${apiKey}&language=pt-BR`
//     try {
//         const currentConditions = await fetch(urlCurrentConditions)

//         if(!currentConditions.ok){
//             console.log("Network response was not ok")
//         }

//         var conditionsData =await currentConditions.json()

//         console.log(conditionsData[0].WeatherText)

//         var metricUnit = conditionsData[0].Temperature.Metric.Unit

//         console.log(conditionsData[0].Temperature.Metric.Value, removeQuotationMarks("abc"))
//     } catch (error) {
//         console.error('Fetch error: ', error)
//     }
// }

// function removeQuotationMarks(quote) {
//     var removedQuotationMarks = quote[1]
//     return removedQuotationMarks
// }

// console.log(removeQuotationMarks("abc"))

// console.log(forecast())