const apiKey = ' 	eN82sMLwPY48Z8ghRH7PtKoJGB3Wdwk6 ';

// Nome da cidade que você está procurando
const cityName = 'Rio';

// Montar a URL com a chave de API e o nome da cidade
const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(cityName)}&language=pt-BR`;

// Função para fazer o fetch e tratar a resposta
async function fetchCityData() {
    try {
        const response = await fetch(url);
        
        // Verificar se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Exibir os dados no console (ou tratar como necessário)
        console.log(data);

        console.log((data).length)

        

        console.log('Termo pesquisado: "', cityName, '"')
        console.log("Quantidade de resultados encontrados: ", data.length)
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            
            if(element != undefined){
                console.log(element.LocalizedName, ",",element.AdministrativeArea.LocalizedName, "- ",element.Country.LocalizedName)
            }
            
            // console.log(element)
            // let cidade = element.ParentCity
            // console.log(cidade)
            // for (let index = 0; index < cidade.length; index++){

            // }
            
        }

        

        // console.log(data[0].Key)

    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

// Chamar a função para executar a requisição
var dados = document.getElementById("dados")


dadosAPI = fetchCityData();

