const interface = require('./interface')

const paramsTypeAlias = '__pType__'

function encode(option) {
  interface.searchInterface.assert(option)

  const url = new URLSearchParams()
  const paramsTypes = {}

  for (const key in option) {
    let value = option[key]

    if (typeof value === 'object') {
      value = JSON.stringify(value)

      if (!paramsTypes.o) paramsTypes.o = []
      paramsTypes.o.push(key)
    } else if (typeof value === 'boolean') {
      value = value ? 1 : 0

      if (!paramsTypes.b) paramsTypes.b = []
      paramsTypes.b.push(key)
    } else if (typeof value === 'number') {
      if (!paramsTypes.n) paramsTypes.n = []
      paramsTypes.n.push(key)
    } else if (typeof value !== 'string') {
      continue
    }

    url.append(key, value)
  }

  url.append(paramsTypeAlias, JSON.stringify(paramsTypes))

  return url
}

function decode(params) {
  if (params instanceof URLSearchParams || typeof params === 'string') {
    const uri = new URLSearchParams(params)

    params = {}

    for (const pair of uri.entries()) {
      const [key, value] = pair

      params[key] = value
    }
  }

  const paramsTypes = JSON.parse(params[paramsTypeAlias] || '{}')

  const result = {}

  for (const key in params) {
    if (key === paramsTypeAlias) continue

    const value = params[key]

    if (paramsTypes.o && paramsTypes.o.includes(key)) {
      result[key] = JSON.parse(value)
    } else if (paramsTypes.b && paramsTypes.b.includes(key)) {
      result[key] = value === '1' ? true : false
    } else if (paramsTypes.n && paramsTypes.n.includes(key)) {
      result[key] = Number(value)
    } else {
      result[key] = value
    }
  }

  return result
}

module.exports = {
  ...interface,
  encode,
  decode
}
