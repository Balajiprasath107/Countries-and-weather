//creating container
const body = document.body
const containerdiv = document.createElement("div")
containerdiv.classList = 'container'
body.append(containerdiv)

//h1 tag inside container
const H1 =document.createElement("h1")
H1.setAttribute("id","title")
H1.classList = "text-center"
containerdiv.append(H1)
document.getElementById("title").innerText = "Countries & Weather"

//creating rowdiv
const rowdiv = document.createElement("div")
rowdiv.classList = 'row'
containerdiv.append(rowdiv)

//fetching countries data
fetch('https://restcountries.com/v3.1/all')
.then((response)=>response.json())
.then((result)=>{
    result.sort((a,b)=>{
        return (a.name.common).localeCompare(b.name.common)
    })
    //creating card for each countries
    for(let country of result){
        temp = country.name.common
        //creating columndiv (card)
        const columndiv = document.createElement("div")
        columndiv.classList = 'col-sm-6 col-lg-4 col-xl-4 col-md-4'
        rowdiv.append(columndiv)

        //creating card
        const card = document.createElement("div")
        card.classList = 'card h-100'
        columndiv.append(card)

        //creating card-header
        const cardheader = document.createElement("div")
        cardheader.classList = 'card-header'
        cardheader.innerText = country.name.common
        card.append(cardheader)

        //creating card-body
        const cardbody = document.createElement("div")
        cardbody.classList = 'card-body'
        card.append(cardbody)

        //creating flag image in card-body
        const flag = document.createElement("img")
        flag.classList = 'card-img-top'
        flag.src = `${country.flags.png}`
        flag.alt = "Country flag"
        cardbody.append(flag)

        //countryinfo in card-body
        const cardtext = document.createElement("div")
        cardtext.classList = 'card-text'
        cardbody.append(cardtext)
        cardtext.innerHTML = `Capital: ${country.capital!=undefined ? country.capital:"---NA---"}<br><br>
                              Region: ${country.region}<br><br>
                              Country Code: ${country.cca3}`

        //button 
        const weatherbtw = document.createElement("button")
        let togglebtw  = false
        weatherbtw.classList = 'btn btn-transparent weather-btw'
        weatherbtw.setAttribute("id","weather-btn")
        weatherbtw.innerText = togglebtw?'Hide Weather':'Click for Weather'
        cardbody.append(weatherbtw)

        //weather 
        const weather = document.createElement("div")
        weather.classList = 'weather-data'
        cardbody.append(weather)

        const apilink = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=1e481b9fcaa72eab694f8b532d9d19f1`
        weatherbtw.addEventListener("click", function(){
            togglebtw = (!togglebtw)
            const objr = (clk(apilink))
            weatherbtw.innerText = togglebtw?'Hide Weather':'Click for Weather'
            weather.innerHTML = (togglebtw)? 
            objr.then(value => {
                weather.innerHTML = `<p>${value[0]}</p>lat : ${value[1]} lon: ${value[2]}`
              }) 
            : null
        })
    }
    
})

async function clk(apilink){
    let data  = await fetch(apilink)
    .then((response)=>response.json())
    .then((result) =>{
         return [result.weather[0].description,result.coord.lat,result.coord.lon]
    })  
    return(data)    
 }
