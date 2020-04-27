let search = document.getElementById('search')
let valueSearch = document.getElementById('valueSearch')
let prevision = document.getElementById('prevision')

const requestAPI = (city) =>{
    fetch("http://localhost:3000/weather?address="+city+"").then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                prevision.innerHTML="Location non trouvé, veuillez refaire votre recherche"
            }
            else{
                /*let temperature = data2.current.temperature
                let feelslike = data2.current.feelslike
                let location = data2.location.name*/
                prevision.innerHTML="A "+data.locationWeather+" il fait "+data.temperature+" degrés"
                console.log(data)

            }
        })
    })
}


search.addEventListener("click",(e)=>{
    requestAPI(valueSearch.value)
    e.preventDefault();
})