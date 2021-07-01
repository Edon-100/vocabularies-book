class DB {
  constructor(tableName) {
    this.tableName = tableName
  }

  addMaterialObj(material) {
    const db = utools.db.get(this.tableName) || {}
    const list = db.list || []
    const existMaterial = list.find((it) => it.text === material.text)
    if (existMaterial) return
    this.setMaterials([...list, material], db)
  }

  setMaterials(materialList, db) {
    try {
      window.utools.db.put({
        _id: this.tableName,
        list: materialList,
        _rev: db._rev
      })
      utools.shellBeep()
    } catch (error) {
      utools.showNotification('added failed', error)
    }
  }

  async deleteMaterialObj(text) {
    const db = utools.db.get(this.tableName) || {}
    const list = db.list || []
    if (!list.length) return
    const newList = list.filter((item) => item.text !== text)
    this.setMaterials(newList, db)
    return db
  }

  getMaterials() {
    const db = utools.db.get(this.tableName) || {}
    return db.list || []
  }
}

module.exports = { DB }
