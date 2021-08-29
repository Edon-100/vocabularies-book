import { AppInfo } from './config'
import { requestBaseUrl } from './constant'

export function searchWords(text: string): Promise<{ content: Youdao }> {
  return fetch(
    `${requestBaseUrl}?text=${text}&appkey=${AppInfo.appkey}&key=${AppInfo.key}`,
    {
      mode: 'cors'
    }
  ).then((response) => response.json())
}
