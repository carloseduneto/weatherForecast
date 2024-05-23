const apiKey = 'd7db451187ac48b4bd7130555242305';
const cityName = 'Guardinha';
const apiUrlCity = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=pt`;
const cacheKey = 'weatherData';
const cacheExpiry = 3600000; // 1 hour in milliseconds

async function fetchWeatherData() {
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
getWeatherData();

async function getWeatherData() {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheExpiry) {
      console.log('Using cached data');
      console.log(data);
      return;
    }
  }
  console.log('Fetching new data');
  fetchWeatherData();
}









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