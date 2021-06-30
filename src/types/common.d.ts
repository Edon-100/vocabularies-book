interface HomeState {
  total: number
  wordType: string
  list: Word[]
  action: UtoolsAction
}

interface WordProps {
  list: Word[]
  total: number
  updateList: () => void
}
