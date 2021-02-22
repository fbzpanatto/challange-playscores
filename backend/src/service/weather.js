const axios = require('axios').default
const { apiKey } = require('../config/config')

class WeatherService {
  constructor() {
  }

  async getByCityName(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    try {
      let result = await axios.get(url)

      result = { 
        cod: result.data.cod, 
        message: {
          city: result.data.name,
          wheater: result.data.main.temp,
          coord: {
            lat: result.data.coord.lat,
            lon: result.data.coord.lon
          }
        } 
      }
      return result
    } catch (error) {
      let result = {cod: 200, message: false}
      return result
    }
  }

  async getByCoordinates(lat, lon) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    try {
      let result = await axios.get(url)
      result = { 
        cod: result.data.cod, 
        message: {
          city: result.data.name,
          wheater: result.data.main.temp,
          coord: {
            lat: result.data.coord.lat,
            lon: result.data.coord.lon
          }
        } 
      }
      return result
    } catch (error) {
      let result = {cod: 200, message: false}
      return result
    }
  }
}

module.exports = WeatherService