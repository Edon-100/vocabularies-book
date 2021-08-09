module.exports = {
  forgettingCurve: [
    5,
    30,
    12 * 60,
    24 * 60,
    2 * 24 * 60,
    4 * 24 * 60,
    7 * 24 * 60,
    15 * 24 * 60,
    30 * 24 * 60
  ],
  // forgettingCurve: [0.5, 2, 4, 8, 16], // 调试时使用
  tableNames: {
    word: 'word'
  },
  baseUrl: 'https://service-pnrys8g3-1254074572.bj.apigw.tencentcs.com/release',
  audioBaseUrl: 'https://dict.youdao.com/dictvoice'
}
