import { tableNames, audioBaseUrl } from './constant'
import { wordModel } from './wordModel'
import { readFileSync } from 'fs'
import * as path from 'path'

;(window as any).services = {
  constanst: {
    tableNames,
    audioBaseUrl
  },
  wordModel,
  getAppVerson: function () {
    const data =
      readFileSync(path.resolve(__dirname, '../plugin.json'), 'utf-8') || '{}'
    return JSON.parse(data)?.version
  }
}
