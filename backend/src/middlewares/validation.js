module.exports = (request, response, next) => {
  const { city, lat, lon } = request.query
  if(!city && (!lat || !lon)) {
    const error = new Error('Informe um nome ou coordenada valida')
    return response.json({error: error.message})
  }
  next()
}