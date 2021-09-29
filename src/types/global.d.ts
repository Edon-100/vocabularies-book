interface Window {
  utools: UToolsApi
  services: {
    constanst: {
      audioBaseUrl: string
      tableName: ''
    }
    wordModel: {
      addVocabulary: (text?:string) => Promise<boolean>
      deleteWrodObj: (text: string) => Promise<DbReturn>
      getAllWords: () => Word[]
      getNeedLearnList: () => Word[]
      getAllAndNeedList: () => {allWords: Word[], needLearnWords: Word[], doneList:Word[]}
      addWordToNextLevel: (text: string) => void
      addWordToPreviousLevel: (text: string) => void
      importWordList: (list:Word[]) => void
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
