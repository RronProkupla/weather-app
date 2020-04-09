const socket = io()

socket.on('forecast', (coords) => {
    document.querySelector("#temperature").innerHTML = coords.temp + "℃"
    document.querySelector("#summary").innerHTML = coords.summary + " with " + coords.precip + "% chance of rain." 
    document.querySelector("#time").innerHTML = coords.time
    console.log(coords)
})

document.querySelector('#searchButton').addEventListener('click', (e) => {
    e.preventDefault()

    socket.emit('searchText', {
        search: document.querySelector('#searchField').value
    })
})

socket.on('search',(searchData) => {
    if(searchData.error){
        document.querySelector('#searchError').innerHTML = searchData.error
    }else{
        document.querySelector('#searchCity').innerHTML = searchData.location
        document.querySelector('#searchTemp').innerHTML = searchData.temp + "℃"
        document.querySelector('#searchSumm').innerHTML = searchData.summary + " with " + searchData.precip*100 + "% chance of rain."
        document.querySelector('#searchTime').innerHTML = searchData.time

    }
})

document.querySelector('#searchField').addEventListener('keypress', function(e) {
    if(e.keyCode == 13 ){
        socket.emit('searchText', {
            search: document.querySelector('#searchField').value
        })
    }
})



window.addEventListener('load' , (e) => {
    e.preventDefault()

    socket.emit('goal' , {
        hello : 'hello'
       
    })

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})