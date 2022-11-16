async function addNewCityToLocalStorage(newCity) {

    const cargandoText = document.getElementById('cargando-text');
    cargandoText.style.display = "block";

    let cities = getCitiesFromLocalStorage();

    if(cities.includes(newCity.toLowerCase())) {
        const error_message = document.getElementById('error_message');
        cargandoText.style.display = "none";
        error_message.style.display = "block";
        setTimeout(() => {
            error_message.style.display = "none";
        }, 3000);

        return 0;
    }

    
    const cityData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=10c0656ee4ab847c93d8f27505e2734d&units=metric&lang=es`)
    
    if(cityData.status === 404) {
        const warning_message = document.getElementById('warning_message');
        cargandoText.style.display = "none";
        warning_message.style.display = "block";
        setTimeout(() => {
            warning_message.style.display = "none";
        }, 3000);

        return 0;
    }



    cities.push(newCity.toLowerCase());

    localStorage.setItem("CITIES", JSON.stringify(cities));

    const success_message = document.getElementById('success_message');
    cargandoText.style.display = "none";
    success_message.style.display = "block";
    setTimeout(() => {
        success_message.style.display = "none";
    }, 3000);
        
    return 1;
}

/* Se puede agregar un intervalo para testear el Cargando.. en la pagina add-city */