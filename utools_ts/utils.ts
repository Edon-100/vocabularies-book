// import { wordModel } from 'wordModel'
import { AppInfo } from './config'
import axios from 'axios';
import * as CryptoJs from 'crypto-js';

function truncate(q: string) {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}
export async function getYoudaoTranslate(
  query: string,
  from = 'en',
  to = 'zh-CHS',
):Promise<any> {
  // const vocabId = '您的用户词表ID';
  try {
    // const appKey = process.env.YD_APP_KEY;
    const appKey = AppInfo.appkey;
    const key = AppInfo.key;
    const salt = new Date().getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const str1 = appKey + truncate(query) + salt + curtime + key;
    const sign = CryptoJs.SHA256(str1).toString(CryptoJs.enc.Hex);
    const res = await axios.get('https://openapi.youdao.com/api', {
      params: {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: 'v3',
        curtime: curtime,
      },
    });
    return res.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}

export async function searchWords(text: string): Promise<Youdao> {
  const data = await getYoudaoTranslate(text)
  return {
    isWord: data?.isWord,
    explains: data?.isWord ? data?.basic?.explains : data.translation,
    phonetic: data?.basic?.phonetic
  }
}

