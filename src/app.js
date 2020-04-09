const path = require('path')
const http = require('http')
const request = require('request')
const express = require('express')
const socketio = require('socket.io')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection' , (socket) => {
    
    socket.on('sendLocation' , (coords) => {
        forecast(coords.latitude,coords.longitude, (error , forecastdata) => {
                if(error){
                    return error
                }
                let a = new Date(forecastdata.time *1000)
                a = a.toTimeString().split(" ")[0]
                forecastdata.time = a
                socket.emit('message',forecastdata)
            })
      
       
        })

})


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})