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
                socket.emit('forecast',forecastdata)
            })
      
       
        })

    socket.on('searchText', (data) => {
        address = data.search.trim()
        geocode(address, (error,result) => {
            if(error){
                socket.emit('search',{
                    error:error
                })
            }else{
                forecast(result.latitude,result.longitude,(error,forecastdata) => {
                    if(error){
                        socket.emit('search',{
                            error:error
                        })
                    }else{
                        socket.emit('search',{
                            summary: forecastdata.summary,
                            temp: forecastdata.temp , 
                            precip: forecastdata.precip,
                            time: forecastdata.time,
                            location:result.location
                        })
                    }
                })
            }
        })
    })

})


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})