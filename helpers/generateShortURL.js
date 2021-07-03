function generateShortURL() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const len = 5

  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''), upperCaseLetters.split(''), numbers.split(''))

  let shortURL = ''
  for (i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * collection.length)
    shortURL += collection[index]
  }
  return shortURL
}

module.exports = generateShortURL