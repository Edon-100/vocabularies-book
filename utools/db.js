class DB {
  constructor(tableName) {
    this.tableName = tableName
  }

  addMaterialObj(material) {
    try {
      const db = utools.db.get(this.tableName) || {}
      const list = db.list || []
      const existMaterial = list.find((it) => it.text === material.text)
      if (existMaterial) return
      this.setMaterials([...list, material], db)
    } catch (error) {
      console.log(error)
    }
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
      console.log(error)
    }
  }

  async deleteMaterialObj(text) {
    try {
      const db = utools.db.get(this.tableName) || {}
      const list = db.list || []
      if (!list.length) return
      const newList = list.filter((item) => item.text !== text)
      this.setMaterials(newList, db)
      return db
    } catch (error) {
      console.log(error)
    }
  }

  getMaterials() {
    try {
      const db = utools.db.get(this.tableName) || {}
      return db.list || []
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = { DB }
