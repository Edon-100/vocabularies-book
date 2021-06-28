// const { ReviewDbName } = reuqire('./constant')

class WordsDB {
  constructor() {}

  static addMaterialObj(material) {
    const db = utools.db.get('ReviewDbName') || {}
    const list = db.list || []
    const existMaterial = list.find((it) => it.text === material.text)
    if (existMaterial) return
    WordsDB.setMaterials([...list, material], db)
  }

  static setMaterials(materialList, db) {
    try {
      window.utools.db.put({
        _id: 'ReviewDbName',
        list: materialList,
        _rev: db._rev
      })
      utools.shellBeep()
    } catch (error) {
      utools.showNotification('added failed', error)
    }
  }

  static async deleteMaterialObj(text) {
    const db = utools.db.get('ReviewDbName') || {}
    const list = db.list || []
    if (!list.length) return
    const newList = list.filter((item) => item.text !== text)
    WordsDB.setMaterials(newList, db)
    return db
  }
}

module.exports = { WordsDB }
