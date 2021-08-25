interface HomeState {
  total: number
  allWordsNumber: number
  doneTotal: number
  wordType: 'list' | 'card'
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

type LetterState = 'normal' | 'correct' | 'wrong'

interface LetterProps {
  letter: string
  visible: boolean
  wrong: boolean
  mode: 'hidden' | 'visible'
}
