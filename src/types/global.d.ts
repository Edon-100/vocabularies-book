// import { UtoolState } from "src/store/utool";

interface Window {
  utools: UToolsApi
  posthog: any
  services: {
    constanst: {
      audioBaseUrl: string
      tableName: ''
    }
    getAppVerson: () => string;
    wordModel: {
      addVocabulary: (text?:string) => Promise<Word>
      deleteWrodObj: (text: string) => Promise<DbReturn>
      getAllWords: () => Word[]
      getNeedLearnList: () => Word[]
      getAllAndNeedList: () => {allWords: Word[], needLearnWords: Word[], doneList:Word[]}
      addWordToNextLevel: (text: string) => void
      addWordToPreviousLevel: (text: string) => void
      importWordList: (list:Word[]) => void
      minimizeDbSize: Function
      getUtoolsSetting: () => UtoolState
      setUtoolsSetting: (setting: Partial<UtoolState>) => void
      getAppVersionFromDb: () => {version:string}
      setAppVerson: (verson:string) => void
      updateWordTranslate: (word:string, explain: string[]) => void
    }
  }
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.mp3'
declare module '*.tiff'
declare var require: any


interface UtoolsAction {
  code: 'add_vocabulary' | 'kill' | string
  type: string
  payload: any
  optional: { type: string; payload: any }[]
}

interface UtoolState {
  closeAfterAddWord: boolean
}
