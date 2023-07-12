import { APP_CONFIG } from "constant"

export class ConfigModel {
	private _db: DbDoc
	constructor() {
    // 确保了也定有this._db
    //     todo 原接口onPluginReader文档里已找不到，找到enter接口，发现不执行先注掉
    // utools.onPluginEnter(() => {
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
    // })
  }
}
