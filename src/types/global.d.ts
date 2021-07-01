interface Window {
  utools: UToolsApi
  services: {
    wordModel: {
      addVocabulary: () => Promise<boolean>
      staticaddMaterialObj: () => void
      setMaterials: () => void
      deleteMaterialObj: (text: string) => Promise<DbReturn>
      getMaterials: () => Word[]
      getNeedLearnList: () => Word[]
      addWordToNextLevel: () => void
      addWordBackPreviousLevel: () => void
    }
  }
}

interface UtoolsAction {
  code: 'add_vocabulary' | 'kill' | string
  type: string
  payload: any
  optional: { type: string; payload: any }[]
}
