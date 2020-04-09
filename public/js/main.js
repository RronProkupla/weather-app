const socket = io()

socket.on('message', (coords) => {
    console.log(coords)
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