
// declare global {
//   interface Window { MyNamespace: any; }
// }

interface Learn {
  level?: number
  done?: boolean
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

interface Youdao {
  isWord:boolean; // 是否是一个单词
  explains:string[]; // 中文解析翻译
  phonetic:string; // 音标
}

interface Word {
  text: string
  isWord:boolean; // 是否是一个单词
  explains:string[]; // 中文解析翻译
  phonetic:string; // 音标
  ctime: string
  learn: Learn
}

type MyDbDoc = {
  _id: string
  _rev?: string
  list: Word[]
}

interface AllTypeList {
  allWords: Word[]
  needLearnWords: Word[]
  doneList: Word[]
}
