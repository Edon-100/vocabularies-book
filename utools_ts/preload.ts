import { tableNames, audioBaseUrl } from './constant'
import { wordModel } from './wordModel'
import { minimizeWordDb } from './utils'
;(window as any).services = {
  constanst: {
    tableNames,
    audioBaseUrl
  },
  utils: {
    minimizeWordDb
  },
  wordModel
}
