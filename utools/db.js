class DB {
  constructor(tableName) {
    this.tableName = tableName
    utools.onPluginReady(() => {
      this._db = utools.db.get(this.tableName) || {}
    })
  }

  addMaterialObj(material) {
    try {
      this.getMaterials();
      const list = this._db.list || []
      const existMaterial = list.find((it) => it.text === material.text)
      if (existMaterial) return
      this.setMaterials([...list, material])
    } catch (error) {
      console.log(error)
    }
  }

  setMaterials(materialList) {
    try {
      window.utools.db.put({
        _id: this.tableName,
        list: materialList,
        _rev: this._db._rev
      })
      utools.shellBeep()
    } catch (error) {
      console.log(error)
    }
  }

  async deleteMaterialObj(text) {
    try {
      this.getMaterials();
      const list = this._db.list || []
      if (!list.length) return
      const newList = list.filter((item) => item.text !== text)
      this.setMaterials(newList)
    } catch (error) {
      console.log(error)
    }
  }

  getMaterials() {
    try {
      const db = utools.db.get(this.tableName) || {}
      this._db = db
      console.log(db.list)
      return db.list || []
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = { DB }
