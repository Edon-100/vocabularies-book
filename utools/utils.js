const axios = require('axios')
const dayjs = require('dayjs')
const { forgettingCurve } = require('./constant')

module.exports = {
  searchWords: (text) => {
    const appkey = '3bc15f324114c0f3'
    const key = 'v5rQlNuFWiR5SrwW5ob5jl4SUbDhFDua'
    const baseUrl = `https://service-pnrys8g3-1254074572.bj.apigw.tencentcs.com/release?text=${text}&appkey=${appkey}&key=${key}`
    return axios.get(baseUrl)
  },
  createMaterialObj: (text, youdao) => {
    // 单词增加
    let t = text
    let textExts = []
    if (youdao.returnPhrase) {
      t = youdao.returnPhrase[0]
      if (t.toLowerCase() !== text.toLowerCase()) {
        textExts.push(text)
      }
    }
    const material = {
      text: t,
      textExts,
      translation: youdao.translation[0],
      ctime: dayjs().format(),
      learn: {
        level: 0,
        learnDate: dayjs().add(forgettingCurve[0], 'm').format()
      },
      // 保留完整数据，后面可能会使用
      youdao
      // addFrom: location.href
    }
    return material
  }
}

// function createMaterialObj(text, youdao) {
//   // 单词增加
//   let t = text
//   let textExts = []
//   if (youdao.returnPhrase) {
//     t = youdao.returnPhrase[0]
//     if (t.toLowerCase() !== text.toLowerCase()) {
//       textExts.push(text)
//     }
//   }

//   const material = {
//     text: t,
//     textExts,
//     translation: youdao.translation[0],
//     ctime: dayjs().format(),
//     learn: this.createLearnObj(),
//     // 保留完整数据，后面可能会使用
//     youdao,
//     addFrom: location.href
//   }
//   return material
// }
