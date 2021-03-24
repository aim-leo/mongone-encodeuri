const { searchInterface } = require('./interface')

function encode(option) {
  searchInterface.assert(option)

  const url = new URLSearchParams()

  url.append('searchParams', JSON.stringify(option))

  return url
}

function decode(uri) {
  const searchParams = new URLSearchParams(uri).get('searchParams')

  return JSON.parse(searchParams)
}

module.exports = {
  encode,
  decode
}
