const { DB } = require('./db')
const { forgettingCurve, tableNames } = require('./constant')
const { searchWords } = require('./utils')
const dayjs = require('dayjs')

class WordModel {
  constructor() {
    this.db = new DB(tableNames.word)
  }

  /**
   * @description 返回库中所有的单词
   * @returns {Array} wordList
   */
  getMaterials() {
    return this.db.getMaterials()
  }

  /**
   * @param {string} text 单词
   * @param {Object} youdao 有道查询的结果
   * @description 结合有道云查询结果，生成符合入库格式的对象
   */
  _createMaterialObj(text, youdao) {
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

  /**
   *
   * @description 把组合的查询结果入库
   */
  async addVocabulary() {
    try {
      const { clipboard } = require('electron')
      let text = clipboard.readText()
      const index = text.indexOf('摘')
      text = index > 0 ? text.slice(0, text.indexOf('摘')) : text // 兼容苹果book
      const { content } = await searchWords(text)
      const material = this._createMaterialObj(text, content)
      this.db.addMaterialObj(material)
      return true
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * @description 返回需要复习的单词列表
   * @returns {Array} materialList
   */
  async getNeedLearnList() {
    const materialList = this.getMaterials()
    const l2 = materialList.filter(({ learn }) => {
      return dayjs().format() > learn.learnDate
    })
    return l2
  }

  /**
   * @description 增加单词的记忆时间
   * @param {string} text 单词string
   */
  addWordToNextLevel(text) {
    const materialList = this.getMaterials()
    const material = materialList.find((it) => it.text === text)
    const level = material.learn.level + 1
    if (forgettingCurve[level]) {
      const time = dayjs().add(forgettingCurve[level], 'm').format()
      material.learn = {
        level,
        learnDate: time
      }
    } else {
      material.learn = {
        learnDate: dayjs().format(),
        done: true
      }
    }
    this.db.setMaterials(materialList)
  }

  /**
   * @description 单词忘记了，回复到最原始的记忆level
   * @param {*} text 单词
   */
  addWordBackPreviousLevel(text) {
    const materialList = this.getMaterials()
    const material = materialList.find((it) => it.text === text)
    material.learn = {
      level: 0,
      learnDate: dayjs().add(forgettingCurve[0], 'm').format()
    }
    this.db.setMaterials(materialList)
  }
}

const wordModel = new WordModel()

module.exports = {
  wordModel
}
