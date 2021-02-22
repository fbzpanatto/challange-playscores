const WeatherService = require('../service/weather')

class Controller {
  constructor(weatherService) {
    this._weatherService = weatherService
  }

  async getWeatherByCityName(city) {
    const result = await this._weatherService.getByCityName(city) 
    return result
  }

  async getWeatherByCityCoor(lat, lon) {
    const result = await this._weatherService.getByCoordinates(lat, lon)
    return result
  }
}

module.exports = new Controller(new WeatherService())