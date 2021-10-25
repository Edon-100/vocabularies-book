// import { wordModel } from 'wordModel'
import { AppInfo } from './config'
import { requestBaseUrl } from './constant'

export async function searchWords(text: string): Promise<Youdao> {
  const res = await fetch(
    `${requestBaseUrl}?text=${text}&appkey=${AppInfo.appkey}&key=${AppInfo.key}`,
    {
      mode: 'cors'
    }
  )
  const { content } = await res.json()
  console.log('searchWords', content)
  return {
    isWord: content?.isWord,
    explains: content?.basic?.explains,
    phonetic: content?.basic?.phonetic
  }
}

// export function minimizeWordDb() {
//   const { isMinimize } = utools.db.get('ifMinimize') as any
//   console.log('isMinimize', isMinimize)
//   if (isMinimize) return
//   const list = wordModel.getAllWords()
//   console.log('list', list)
// }
