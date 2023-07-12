export class BaseDB {
  private _db: DbDoc

  constructor(private tableName: string) {
    utools.onPluginEnter(({code, type, payload}) => {
      console.log('用户进入插件应用', code, type, payload)
    })


    // 确保了也定有this._db
    // todo 原接口onPluginReader文档里已找不到，找到enter接口，发现不执行先注掉
    // utools.onPluginEnter(() => {
      console.log(1111)
      const db = utools.db.get(tableName)
      console.log(db+'111111')
      if (db) {
        this._db = db
      } else {
        utools.db.put({
          _id: tableName,
          list: []
        })
        this._db = utools.db.get(tableName) as DbDoc
      }
    // })
  }

  /**
   * @description 获取、更新_db最新数据
   * @return {Word[]} wordList
   */
  public getWordList() {
    this._db = utools.db.get(this.tableName)!

    console.log(this._db+'222222')
    const word =this._db.list as Word[]
    console.log(word)
    return word
  }

  /**
   * @description 把单词数据存入db中,并且更新 _db中的List
   * @param {Word[]} wordList
   */
   public updateDataToDB(wordList: Word[]) {
    const { id, rev, ok } = window.utools.db.put({
      _id: this.tableName,
      list: wordList,
      _rev: this._db._rev
    })
    if (ok) {
      this._db = {
        _id: id,
        _rev: rev,
        list: wordList
      }
    } else {
      alert('更新数据库失败')
    }
  }

  /**
   * @description 待会先判断是否存在该单词再考虑是否入库
   * @param {Word} word
   */
  public addNewWordToDb(word: Word) {
    const list = this._db.list as Word[]
    const isExistWord = this.isExistWord(word.text)
    if (isExistWord) return
    this.updateDataToDB([word, ...list])
  }

  /**
   * @description 查询哭中是否存在该单词
   * @param {string} text
   * @return {boolean} isExistWord
   */
  public isExistWord(text: string) {
    return !!this._db.list.find((it: Word) => it.text === text)
  }

  /**
   * @description 从db中删除某个单词
   * @param {string} text
   */
  async deleteWord(text: string) {
    const list = this._db.list || []
    if (!list.length) return
    const newList = list.filter((item: Word) => item.text !== text)
    this.updateDataToDB(newList)
    return newList;
  }
}
