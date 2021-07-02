interface HomeState {
  total: number
  wordType: string
  list: Word[]
  action: UtoolsAction | {}
}

interface WordProps {
  list: Word[]
  total: number
  updateList?: (action?: UtoolsAction) => void
}

type LetterState = 'normal' | 'correct' | 'wrong'

interface LetterProps {
  letter: string
  visible: boolean
}
