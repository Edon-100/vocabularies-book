const { WordsDB } = require('./db.js')
const { searchWords, createMaterialObj } = require('./utils')
// import moduleName from 'module'
// const fs = require('fs')

window.services = {
  WordsDB,
  add_vocabulary: async () => {
    try {
      const { clipboard } = require('electron')
      let text = clipboard.readText()
      text = text.slice(0,text.indexOf('摘')) // 兼容苹果book
      const {
        data: { content }
      } = await searchWords(text)
      const material = createMaterialObj(text, content)
      WordsDB.addMaterialObj(material)
      return true;
    } catch (error) {
      console.log(error)
    }
  }
}

// window.exports = {
//   add_vocabulary: {
//     // 注意：键对应的是 plugin.json 中的 features.code
//     mode: 'list', // 用于无需 UI 显示，执行一些简单的代码
//     args: {
//       // 进入插件时调用
//       enter: async (action, searchWord, callbackSetList) => {
//         try {
//           alert(333)
//           // utools.hideMainWindow();
//           // const { clipboard } = require('electron')
//           // const text = clipboard.readText()
//           // const {
//           //   data: { content }
//           // } = await searchWords(text)
//           // const material = createMaterialObj(text, content)
//           // WordsDB.addMaterialObj(material)
//         } catch (error) {
//           alert(error)
//         }
//         // const db = utools.db.get(DBNAME) || { data: {} }
//         // let new_db_data = Object.assign(db.data, { [text]: text })
//         // window.utools.db.put({
//         //   _id: DBNAME,
//         //   data: new_db_data,
//         //   _rev: db._rev
//         // })
//       },
//       // 用户选择列表中某个条目时被调用
//       select: (action, itemData, callbackSetList) => {
//         alert(itemData)
//       }
//     }
//   },
//   kill: {
//     mode: 'none',
//     args: {
//       enter: () => {
//         try {
//           // utools.hideMainWindow();
//           // utools.createBrowserWindow('index.html', {title: '测试窗口'})
//           // utools.ubrowser
//           //   .goto(
//           //     'file:///Users/laixiaodong/Desktop/projects/edon/work-killer/dist/index.html'
//           //   )
//           //   .devTools('bottom')
//           //   .run({ width: 1000, height: 600 })
//         } catch (error) {
//           alert(error)
//         }
//       }
//     }
//   }
// }
