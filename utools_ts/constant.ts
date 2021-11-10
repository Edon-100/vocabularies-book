// 记忆曲线
export const forgettingCurve = [
  0, // 立马
  5, // 5分钟
  30, // 30分钟
  12 * 60, // 半天
  24 * 60, // 1天
  2 * 24 * 60, // 2天
  4 * 24 * 60, // 4天
  7 * 24 * 60, // 7天
  15 * 24 * 60, // 15天
  30 * 24 * 60 // 30天
]
// forgettingCurve: [0.5, 2, 4, 8, 16], // 调试时使用
export const tableNames = {
  word: 'word'
}
export const requestBaseUrl =
  'https://service-pnrys8g3-1254074572.bj.apigw.tencentcs.com/release'
export const audioBaseUrl = 'https://dict.youdao.com/dictvoice'
