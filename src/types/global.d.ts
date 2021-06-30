interface Window {
  utools: UToolsApi
  services: {
    add_vocabulary: () => Promise<boolean>
    WordsDB: {
      addMaterialObj: () => void
      setMaterials: () => void
      deleteMaterialObj: (text: string) => Promise<DbReturn>
    }
  }
}

interface UtoolsAction {
  code: 'add_vocabulary' | 'kill' | string
  type: string
  payload: any
  optional: { type: string; payload: any }[]
}
