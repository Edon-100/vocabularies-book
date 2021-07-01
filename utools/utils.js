const dayjs = require('dayjs')

module.exports = {
  searchWords: (text) => {
    const appkey = '3bc15f324114c0f3'
    const key = 'v5rQlNuFWiR5SrwW5ob5jl4SUbDhFDua'
    const baseUrl = `https://service-pnrys8g3-1254074572.bj.apigw.tencentcs.com/release?text=${text}&appkey=${appkey}&key=${key}`
    return fetch(baseUrl, { mode: 'cors' }).then((response) => response.json())
  }
}
