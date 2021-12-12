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
  return {
    isWord: content?.isWord,
    explains: content?.isWord ? content?.basic?.explains : content.translation,
    phonetic: content?.basic?.phonetic
  }
}
