type WordType = 'list' | 'card' | 'notebook'
export interface HomeState {
  total: number
  allWordsNumber: number
  doneTotal: number
  showExport: boolean
  showImport: boolean
  wordType: 'list' | 'card' | 'notebook'
  list: Word[]
  allWords: Word[]
  action: UtoolsAction | {}
}

export interface WordProps {
  total: number
  list: Word[]
  allWords?: Word[]
  updateList?: (action?: UtoolsAction) => void
}

export interface NoteBookProps {
  allWords?: Word[]
}
type LetterState = 'normal' | 'correct' | 'wrong'

export interface LetterProps {
  letter: string
  visible: boolean
  wrong: boolean
  mode: 'hidden' | 'visible'
}

export interface IHomeFooter {
  allWordsNumber: number
  allWords: Word[]
  total: number
  doneTotal: number
  wordType: 'list' | 'card' | 'notebook'
  switchWordType: (type: 'list' | 'card' | 'notebook') => void
  updateWordsListToState: () => void
}

export interface AppConfig {
  outAfterAddWord: boolean
}

export interface PluginEnterAction {
  code: string
  type: string
  payload: any
}
