function main () {
    const select = document.getElementById('city-choose')
    let cities = getCitiesFromLocalStorage();

    if(!cities.length) {
       const noCities = document.createElement("option");
       noCities.text = "No hay ciudades agregadas";
       noCities.setAttribute('disabled', '');
       noCities.setAttribute('selected', '');
       select.add(noCities)
    } else {
        const selectCity = document.createElement("option");
        selectCity.text = "Seleccione una ciudad";
        selectCity.setAttribute('disabled', '');
        selectCity.setAttribute('selected', '');
        
        let counter = 2;

        for(city of cities) {
            const optionCity = document.createElement("option");
            optionCity.text = city;
            optionCity.setAttribute('value', city);
            select.add(optionCity, counter);
            counter++;
        }
        select.add(selectCity);
    }
};

/*
Esta función solo se ejecuta al clickear en el boton,
si bien veo en la consigna: Armar una función que realice el llamado a la API e invocar cada vez que cambie el
valor del desplegable. No decidí incluirlo ya que no le veia utilidad al boton si esto era asi
, pero asi como está en el button onclick, deberia estar en el onchange
del select.
*/

async function fetchCityWeather () {

    const cargandoText = document.getElementById('cargando-text');
    cargandoText.style.display = "block";


    const card = document.getElementById('info-card');
    card.style.display = "none";

    const select = document.getElementById("city-choose");
    const selectedCity = select.options[select.selectedIndex].value;

    const cityData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=10c0656ee4ab847c93d8f27505e2734d&units=metric&lang=es`)
                .then(response => response.json())
                .then(data => {
                    if(data.cod === '404') {
                        const error_message = document.getElementById('error_message');
                        cargandoText.style.display = "none";
                        error_message.style.display = "block";
                        setTimeout(() => {
                            error_message.style.display = "none";
                        }, 3000);
                    
                    } else {
                        const cityName = document.getElementById('cityname');
                        const cityTemp = document.getElementById('temp');
                        const cityST = document.getElementById('sen-term');
                        const cityH = document.getElementById('humedad');
                        const cityVelV = document.getElementById('vel-vient');
                        const cityP = document.getElementById('presion');
                        
    
                        cityName.innerHTML = data.name;
                        cityTemp.innerHTML = `Temperatura: ${data.main.temp}°`;
                        cityST.innerHTML = `Sensación térmica: ${data.main.feels_like}°`;
                        cityH.innerHTML = `Humedad: ${data.main.humidity}%`;
                        cityVelV.innerHTML = `Velocidad del viento: ${data.wind.speed}km/h`;
                        cityP.innerHTML = `Presión: ${data.main.pressure} P`;
    
                        cargandoText.style.display = "none";
    
                        card.style.display = "block";
                    }

                });
}

main ();