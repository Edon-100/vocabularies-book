const { appkey, key } = require('./config')
const { baseUrl } = require('./constant')

module.exports = {
  searchWords: (text) => {
    return fetch(`${baseUrl}?text=${text}&appkey=${appkey}&key=${key}`, {
      mode: 'cors'
    }).then((response) => response.json())
  }
}
