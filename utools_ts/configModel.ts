import { APP_CONFIG } from "constant"

export class ConfigModel {
	private _db: DbDoc
	constructor() {
    // 确保了也定有this._db
    utools.onPluginReady(() => {
      const db = utools.db.get(APP_CONFIG)
      if (db) {
        this._db = db
      } else {
        utools.db.put({
          _id: APP_CONFIG,
          list: []
        })
        this._db = utools.db.get(APP_CONFIG) as DbDoc
      }
    })
  }
}