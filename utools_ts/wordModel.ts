import { BaseDB } from './db'
import { tableNames, forgettingCurve } from './constant'
// @ts-ignore
import { clipboard } from 'electron'
import { searchWords } from './utils'
import * as dayjs from './dayjs.min.js'

class WordModel {
  db: BaseDB
  constructor() {
    this.db = new BaseDB(tableNames.word)
  }

  /**
   * @description 不加修饰，直接返回库中所有的单词
   * @returns {Word[]} wordList
   */
  public getAllWords() {
    return this.db.getWordList()
  }

  /**
   * @param {string} text 单词
   * @param {Object} youdao 有道查询的结果
   * @description 结合有道云查询结果，生成符合入库格式的对象
   */
  private _createWordObj(text: string, youdao: Youdao) {
    const word = {
      text,
      isWord: youdao.isWord,
      explains: youdao.explains,
      phonetic: youdao.phonetic,
      ctime: dayjs().format(),
      learn: {
        level: 0,
        learnDate: dayjs().add(forgettingCurve[0], 'm').format()
      }
    }
    return word
  }

  /**
   *
   * @description 把组合的查询结果入库
   */
  async addVocabulary(text?: string) {
    try {
      if (!text) {
        // 从剪切板中加入单词
        let text = clipboard.readText()
        if (!text) return;
        const index = text.indexOf('摘')
        text = index > 0 ? text.slice(0, text.indexOf('摘')) : text // 兼容苹果book
        text = text.replaceAll('\n', '')
        let regRes = text.match(/^\“(.*)\”$/)
        text = regRes ? regRes[1] : text
      }
      const content = await searchWords(text!)
      const word = this._createWordObj(text!, content)
      this.db.addNewWordToDb(word)
      console.log('添加单词成功', word.text)
      return word
    } catch (error) {
      new Notification('添加失败',{
        body: `msg: ${JSON.stringify(error)}`
      })
      console.log(error)
    }
  }

  // TODO: 应该是要删除没有作用，尽力用getAllAndNeedList
  /**
   * @description deprecated 返回需要复习的单词列表
   * @returns {Array} materialList
   */
  getNeedLearnList(): Word[] {
    const wordList = this.getAllWords()
    const l2 = wordList.filter(({ learn, ctime }) => {
      return (
        (dayjs().format() > learn.learnDate && !learn.done) || // 够时间复习的
        dayjs().unix() - dayjs(ctime).unix() < 5 // 刚刚加入单词表的 TODO: 好像要删除
      )
    })
    return l2
  }

  /**
   * @description 一次性返回需要复习的单词，还有库里所有的单词
   * @return {any}
   */
  getAllAndNeedList(): AllTypeList {
    const allWords = this.getAllWords()
    const doneList = [] as Word[]
    const needLearnWords = [...allWords].filter((word) => {
      const { learn, ctime } = word
      if (learn.done) {
        doneList.push(word)
      }
      return (
        (dayjs().format() > learn.learnDate && !learn.done) ||
        dayjs().unix() - dayjs(ctime).unix() < 5
      )
    })
    return {
      allWords,
      needLearnWords,
      doneList
    }
  }

  /**
   * @description 增加单词的记忆时间
   * @param {string} text 单词string
   */
  addWordToNextLevel(text: string) {
    const wordList = this.getAllWords()
    const word = wordList.find((it) => it.text === text)
    if (!word || word.learn.done) return
    const level = word.learn.level! + 1
    if (forgettingCurve[level]) {
      const time = dayjs().add(forgettingCurve[level], 'm').format()
      word.learn = {
        level,
        learnDate: time
      }
    } else {
      word.learn = {
        learnDate: dayjs().format(),
        done: true
      }
    }
    this.db.updateDataToDB(wordList)
  }

  /**
   * @description 单词忘记了，回复到最原始的记忆level
   * @param {*} text 单词
   */
  addWordToPreviousLevel(text: string) {
    const wordList = this.getAllWords()
    const word = wordList.find((it) => it.text === text)
    const currentLevel = word!.learn.level! - 2 >= 0 ? word!.learn.level! - 2 : 0
    if (word) {
      word.learn = {
        level: currentLevel,
        learnDate: dayjs().add(forgettingCurve[0], 'm').format()
      }
      this.db.updateDataToDB(wordList)
    }
  }

  importWordList(importList: Word[]) {
    const oldList = this.getAllWords()
    const newList = oldList.concat(importList)
    this.db.updateDataToDB(newList)
  }

  deleteWrodObj(text: string) {
    this.db.deleteWord(text)
  }

  minimizeDbSize() {
    try {
      const data = utools.db.get('ifMinimize') as any
      if (data?.isMinimize) return // 不需要优化，直接退出
      let list = this.db.getWordList()
      if (!list.length) return;
      console.log('需要优化单词本')
      list = list.map((word) => {
        const newWord = word.explains
        if (newWord) {
          return word
        } else {
          return {
            text: word.text,
            // @ts-ignore
            isWord: word?.youdao?.isWord,
            // @ts-ignore
            explains: word?.youdao?.basic?.explains,
            // @ts-ignore
            phonetic: word?.youdao?.basic?.phonetic,
            ctime: word.ctime,
            learn: word.learn
          }
        }
      })
      this.db.updateDataToDB(list)
      utools.db.put({
        _id: 'ifMinimize',
        isMinimize: true
      })
    } catch (error) {
      console.log('minimizeDbSize err', error)
    }
  }
}

export const wordModel = new WordModel()
