interface Learn {
  level: number | 'done'
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
  explains?: string[]
  ['us-speech']: string
  isWord: boolean
  speakUrl: string
  phonetic: string
}

// interface Youdao {
//   isWord:boolean; // 是否是一个单词
//   explains:string[]; // 中文解析翻译
//   phonetic:string; // 音标
// }

export interface IAffix {
  phonetic:string; // 音标
  explains:string[]; // 中文解析翻译
  isWord:boolean; // 是否是一个单词
  text:string;
}

interface IWord {
  affix: IAffix
  id:number
  isDone:boolean
  nextReviewDate: string
  forgettingCurveLevel: number
}

interface CardProps {
  word: IWord
  mode?: 'visible' | 'hidden'
  showTranslate?: boolean
  showFirstWordTranslate?: boolean;
  updateList?: (action?: UtoolsAction) => void
  changeWord?: (type: 'prev' | 'next') => void
  // cRef?:any;
  playWordSound?: (word:any) => void
}

interface TranslateItemProps {
  transalteText:string;
  index:number;
  handleItemChange: (index:number,html:string) => void
}