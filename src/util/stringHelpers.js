const strLimit = (string, limit) => {
  if (string) {
    if (string.length > limit) {
      return string.substring(0, limit) + '...'
    }
    return string
  }

  return null
}

const moneyFormat = (number, useSymbol) => {
  if (!number) {
    number = 0
  }
  if (useSymbol) {
    return window.numeral(number).format('$0,0.00')
  }
  return window.numeral(number).format('0,0.00')
}


const wordUpper = (text) => {
  if (!text) return
  let words = text.toLowerCase().split(' ')
  for (let a = 0; a < words.length; a++) {
    let w = words[a]
    if (w[0] !== 'd' || w.slice(1) !== 'e') {
      words[a] = w[0].toUpperCase() + w.slice(1)
    }
  }
  return words.join(' ')
}


export {
  strLimit, moneyFormat, wordUpper
}