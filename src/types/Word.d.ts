interface Learn {
  level: number
  learnDate: Date
}

interface WebItem {
  value: string[]
  key: string
}

interface YoudaoBasic {
  exam_type: '初中' | '高中' | 'CET4' | 'CET6' | '考研' | 'SAT'
  ['uk-phonetic']: string
  ['us-phonetic']: string
  ['uk-speech']: string
  explains: string[]
  ['us-speech']: string
  isWord: boolean
  speakUrl: string
  phonetic: string
}

interface Youdao {
  returnPhrase: string[]
  query: string
  errorCode: number
  l: string
  tSpeakUrl: string
  web: WebItem[]
  requestId: string
  translation: string[]
  dict: string
  webdict: string
  basic: YoudaoBasic
}

interface Word {
  text: string
  textExts: Array<any>
  translation: string
  ctime: string
  learn: Learn
  youdao: Youdao
}

interface CardProps {
  word: Word | undefined
  updateList?: (action?: UtoolsAction) => void
  changeWord?: (type: 'prev' | 'next') => void
}
