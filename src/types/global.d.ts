interface Window {
  utools: UToolsApi
  services: {
    constanst: {
      audioBaseUrl: string
      tableName: ''
    }
    wordModel: {
      addVocabulary: () => Promise<boolean>
      staticaddMaterialObj: () => void
      setMaterials: () => void
      deleteMaterialObj: (text: string) => Promise<DbReturn>
      getMaterials: () => Word[]
      getNeedLearnList: () => Word[]
      addWordToNextLevel: (text: string) => void
      addWordBackPreviousLevel: (text: string) => void
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

interface UtoolsAction {
  code: 'add_vocabulary' | 'kill' | string
  type: string
  payload: any
  optional: { type: string; payload: any }[]
}
