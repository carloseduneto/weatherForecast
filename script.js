const apiKey = 'd7db451187ac48b4bd7130555242305';
var cityName = 266828;
let cacheWeatherForecastKey = 'forecastData'
let cacheKey = 'weatherData';
// const cacheExpiry = 3600000; // 1 hour in milliseconds
const cacheExpiry = 3600000; // 1 hour in milliseconds

let city = document.getElementById("city")
let temperature = document.getElementById("temperature")
let status = document.getElementById("status")
let wet = document.getElementById("wet")
let precip_in = document.getElementById("precip_in")
let last_updated = document.getElementById("last_updated")
let threeDays = document.getElementsByClassName("threeDays")
let body = document.getElementById("body")

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


/*async function fetchWeatherData() {
      fetch(apiUrlCurrent)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        //   displayWeatherData(data);
            
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
    }
*/

async function fetchWeatherData(cityName) {
  let cityName2 = cityName
  let apiUrlCurrent = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=id:${cityName2}&lang=pt`;
  try{
    const response = await fetch(apiUrlCurrent);
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now()}));
    console.log(data)
    
    
    // console.log("A")
    
    
    
    // let cachedData = localStorage.getItem(cacheKey);
    let status1;
    // if (cachedData) {
    // const { data, timestamp } = JSON.parse(cachedData);
    /*if (Date.now() - timestamp < cacheExpiry) {
      console.log('✅ Using cached data');*/
      console.log(data)
      console.log(data.location.name);
      console.log(data.location.region);
      console.log(data.location.country);
      
      console.log(data.current.condition.text)
      console.log(data.current.feelslike_c +" ºC")
      
      city.innerHTML = data.location.name
      
      temperature.innerHTML = data.current.temp_c +"ºC"
      
      status1 = data.current.condition.text
      status.innerHTML = status1
      
      wet.innerHTML = data.current.humidity+"%"
      
      
      
      last_updated.innerHTML = data.current.last_updated.split(' ')[1]
      
      if(rainy.includes(status1)){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1603321544554-f416a9a11fcf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      
      if(cloudy.includes(status1)){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1445264618000-f1e069c5920f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      if(blizzard.includes(status1)){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1547576962-9f4ee7e7a7c1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      if(rainySnowy.includes(status1)){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      if(snowy.includes(status1)){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1545858908-bc6fee2bd44d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      if(storm.includes(status1)){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1537036017783-64573b29adb9?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      if(status1.includes("Sol")){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      if(status1.includes("Céu limpo")){
        body.style.backgroundImage = "url(https://images.unsplash.com/photo-1581886573745-4487c55d95f8?q=80&w=1554&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }
      
      
      return;
    }catch (error){
    console.error("Error: ", error)
  }
}
  // }
/*
  console.log('🔄 Fetching new data');
  fetchWeatherData();
}*/



/*
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
*/

async function fetchWeatherForecast(cityName) {
  let cityName2 = cityName
  let apiUrlWeatherForecast = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=id:${cityName2}&days=3&lang=pt`;
  try {
    const response = await fetch(apiUrlWeatherForecast);
    const data = await response.json();
    // localStorage.setItem(cacheWeatherForecastKey, JSON.stringify({ data, timestamp: Date.now() }));
    // displayWeatherData(data);
    console.log(data);
    
    
    let nextDays="";
    let nextCondition;
    let iconCondition;
    
    // const cachedData = localStorage.getItem(cacheWeatherForecastKey);
    // if (cachedData) {
    // const { data, timestamp } = JSON.parse(cachedData);
    /*if (Date.now() - timestamp < cacheExpiry) {
      console.log('✅ Using cached data');*/
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
      precip_in.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain
      +"%";
      
      console.log(data)
      
      return;
    }catch (error) {
    console.error('Error:', error);
  }
}

  /*console.log('🔄 Fetching new data');
  fetchWeatherForecast();
}*/

fetchWeatherData(cityName);
fetchWeatherForecast(cityName);


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

function replaceSpecialCharacter(texto) {
  const charactersMap = {
      'ã': 'a', 'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a',
      'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
      'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
      'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o', 'õ': 'o',
      'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
      'ç': 'c', 'ñ': 'n'
  };

  return texto.split('').map(char => charactersMap[char] || char).join('');
}


let results = document.getElementById("results")
function toSearch() {
  let responses="";
  let search = document.getElementById("search").value
  search = replaceSpecialCharacter(search)
  const apiUrlCity = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${search}&lang=pt`;
  
  if (search !== null && search !== undefined && search !== '') {
    fetch(apiUrlCity)
    .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(data[0])   
        
        for (let index = 0; index < data.length; index++) {
          console.log(data)
          if(data[index].region!=""){
            responses += `<span class="results" onclick='changeCity(${data[index].id})'>${data[index].name}, ${data[index].region}</span>`
          }else{
            responses += `<span class="results" onclick='changeCity(${data[index].id})'>${data[index].name}, ${data[index].country}</span>`
          }

          console.log(data[index])
        }
        // results.innerHTML = data
        results.innerHTML = responses;
        console.log(responses)
      })
      .catch(error => console.error('Error:', error));
      
      
      
    } else {
      results.innerHTML = "<span></span>"
    }
    
    
  }
  

function changeCity(cityId) {
  let search = document.getElementById("search").value = ""
  results.innerHTML = ""
  console.log("Id Cidade",cityId)
  localStorage.removeItem(cacheKey)
  localStorage.removeItem(cacheWeatherForecastKey)
  fetchWeatherData(cityId)
  fetchWeatherForecast(cityId)
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