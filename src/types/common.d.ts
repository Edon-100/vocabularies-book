type WordType = 'list' | 'card' | 'notebook'
interface HomeState {
  total: number
  allWordsNumber: number
  doneTotal: number
  showExport:boolean
  showImport:boolean
  wordType: 'list' | 'card' | 'notebook'
  list: Word[]
  allWords: Word[]
  action: UtoolsAction | {}
}

interface WordProps {
  total: number
  list: Word[]
  allWords?: Word[]
  updateList?: (action?: UtoolsAction) => void
}

interface NoteBookProps {
  allWords?: Word[]
}
type LetterState = 'normal' | 'correct' | 'wrong'

interface LetterProps {
  letter: string
  visible: boolean
  wrong: boolean
  mode: 'hidden' | 'visible'
}

interface IHomeFooter {
  allWordsNumber:number;
  allWords: Word[]
  total:number;
  doneTotal:number;
  wordType: 'list' | 'card' | 'notebook'
  switchWordType: (type:'list' | 'card' | 'notebook') => void;
  updateWordsListToState: () => void
}
