// @ts-ignore
import React from 'react'
import WordList from './pages/list'
import WordCard from './pages/card'
import NoteBook from './pages/notebook'
import './index.less'
import ErrorBoundary from './components/ErrorBoundaries'
import dayjs from 'dayjs'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { read_file } from './utils'

const mock = {
  list: [
    {
      text: 'return',
      textExts: [],
      translation: '返回',
      ctime: '2021-07-01T20:45:05+08:00',
      learn: {
        learnDate: '2021-07-02T19:11:29+08:00',
        done: true
      },
      youdao: {
        returnPhrase: ['return'],
        query: 'return',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E8%BF%94%E5%9B%9E&langType=zh-CHS&sign=F5C7F2F1241E2E7551D3CC286E3692D3&salt=1608259609977&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['返回', '回报', '归来', '回来'],
            key: 'Return'
          },
          {
            value: ['回佣', '回拥', '回扣', '佣金回馈'],
            key: 'return commission'
          },
          {
            value: ['永恒轮回', '永劫回归', '永恒回归', '永恒的回归'],
            key: 'eternal return'
          }
        ],
        requestId: 'cfa81c9a-a81b-430d-8a29-5449a42f63a5',
        translation: ['返回'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=return'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=return'
        },
        basic: {
          exam_type: [
            '初中',
            '高中',
            'CET4',
            'CET6',
            '考研',
            'GRE',
            '商务英语'
          ],
          'us-phonetic': 'rɪˈtɜːrn',
          phonetic: 'rɪˈtɜːn',
          'uk-phonetic': 'rɪˈtɜːn',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'returns'
              }
            },
            {
              wf: {
                name: '过去式',
                value: 'returned'
              }
            },
            {
              wf: {
                name: '过去分词',
                value: 'returned'
              }
            },
            {
              wf: {
                name: '现在分词',
                value: 'returning'
              }
            },
            {
              wf: {
                name: '第三人称单数',
                value: 'returns'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=return&langType=en&sign=1F121AC8144E7478A99724F8A405D2D8&salt=1608259609973&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: [
            'v. 返回；（尤指感觉）恢复；把……退回；以……相报；（网球等）回击（球）',
            'n. 返回；恢复；归还；（网球等）回击球；被退回的东西；回路导线',
            'adj. 来回的；巡回的；报答的；回程的；返回的'
          ],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=return&langType=en&sign=FCC333882FAC483C321A069A573C41A8&salt=1608259609977&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=return&langType=en&sign=FCC333882FAC483C321A069A573C41A8&salt=1608259609977&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'text',
      textExts: [],
      translation: '文本',
      ctime: '2021-07-01T20:45:31+08:00',
      learn: {
        level: 3,
        learnDate: '2021-07-02T19:19:31+08:00'
      },
      youdao: {
        returnPhrase: ['text'],
        query: 'text',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E6%96%87%E6%9C%AC&langType=zh-CHS&sign=9D685EAB2B7B6006B1363241FD01E34C&salt=1608217720157&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['文本', '文字', '课文', '文本框'],
            key: 'Text'
          },
          {
            value: ['文本模式', '文字模式', '文本标准样式'],
            key: 'text mode'
          },
          {
            value: ['语料库', '文本语料库', '文本库'],
            key: 'text corpus'
          }
        ],
        requestId: '223ffaff-6243-4cd7-b144-852e32c912b5',
        translation: ['文本'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=text'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=text'
        },
        basic: {
          exam_type: ['初中', '高中', 'CET4', 'CET6', '考研'],
          'us-phonetic': 'tekst',
          phonetic: 'tekst',
          'uk-phonetic': 'tekst',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'texts'
              }
            },
            {
              wf: {
                name: '过去式',
                value: 'texted'
              }
            },
            {
              wf: {
                name: '现在分词',
                value: 'texting'
              }
            },
            {
              wf: {
                name: '第三人称单数',
                value: 'texts'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=text&langType=en&sign=0C84E580EA124AFB54449D6C8F3F1661&salt=1608217720157&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['n. [计] 文本；课文；主题', 'vt. 发短信'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=text&langType=en&sign=0C84E580EA124AFB54449D6C8F3F1661&salt=1608217720157&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=text&langType=en&sign=0C84E580EA124AFB54449D6C8F3F1661&salt=1608217720157&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'failed',
      textExts: [],
      translation: '失败的',
      ctime: '2021-07-01T20:45:51+08:00',
      learn: {
        level: 2,
        learnDate: '2021-07-02T19:15:35+08:00'
      },
      youdao: {
        returnPhrase: ['failed'],
        query: 'failed',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E5%A4%B1%E8%B4%A5%E7%9A%84&langType=zh-CHS&sign=4E00F8FE4C72BF4BA1997F18EC1E61F8&salt=1608730442707&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['失败', '接口失效', '不及格', '失败了'],
            key: 'failed'
          },
          {
            value: ['加强语气', '双重否定意味着肯定', '未能', '失败'],
            key: 'failed to'
          },
          {
            value: ['拒爆残留孔眼', '已失效的炮眼'],
            key: 'failed hole'
          }
        ],
        requestId: '41c554ff-4e25-43d1-a9e9-2f6583b23638',
        translation: ['失败的'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=failed'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=failed'
        },
        basic: {
          exam_type: ['初中', '高中', 'CET4', 'CET6', '考研', 'IELTS'],
          'us-phonetic': 'feɪld',
          phonetic: 'feɪld',
          'uk-phonetic': 'feɪld',
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=failed&langType=en&sign=FD2AEAE0C3AC2CE798107D96758B4F2F&salt=1608730442707&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: [
            'adj. 已失败的，不成功的',
            'v. 失败，不成功（fail的过去式和过去分词）'
          ],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=failed&langType=en&sign=FD2AEAE0C3AC2CE798107D96758B4F2F&salt=1608730442707&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=failed&langType=en&sign=FD2AEAE0C3AC2CE798107D96758B4F2F&salt=1608730442707&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'added',
      textExts: [],
      translation: '添加',
      ctime: '2021-07-01T20:47:08+08:00',
      learn: {
        level: 1,
        learnDate: '2021-07-02T17:15:10+08:00'
      },
      youdao: {
        returnPhrase: ['added'],
        query: 'added',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E6%B7%BB%E5%8A%A0&langType=zh-CHS&sign=AEFF4CFA265488E851EAEE705AD2D8D4&salt=1609986060934&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['加', '新增', '上架', '增加的'],
            key: 'Added'
          },
          {
            value: ['增值', '附加价值', '附加值', '增加值'],
            key: 'added value'
          },
          {
            value: ['增值税', '巴基斯坦国民银行', '增殖税', '附加价值税'],
            key: 'value-added tax'
          }
        ],
        requestId: '65867565-c14f-41ce-aef5-21ea3259abb3',
        translation: ['添加'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=added'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=added'
        },
        basic: {
          exam_type: [
            '初中',
            '高中',
            'CET4',
            'CET6',
            '考研',
            'SAT',
            '商务英语'
          ],
          'us-phonetic': 'ˈædɪd',
          phonetic: "'ædɪd",
          'uk-phonetic': "'ædɪd",
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=added&langType=en&sign=983CCBD8D756DC89FD2842620E1D3F8B&salt=1609986060934&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['adj. 更多的；额外的', 'v. 增加（add的过去分词）'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=added&langType=en&sign=983CCBD8D756DC89FD2842620E1D3F8B&salt=1609986060934&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=added&langType=en&sign=983CCBD8D756DC89FD2842620E1D3F8B&salt=1609986060934&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'module',
      textExts: [],
      translation: '模块',
      ctime: '2021-07-01T20:47:24+08:00',
      learn: {
        level: 1,
        learnDate: '2021-07-02T17:15:15+08:00'
      },
      youdao: {
        returnPhrase: ['module'],
        query: 'module',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E6%A8%A1%E5%9D%97&langType=zh-CHS&sign=9CDACC1607235AC085757B0CAEB6F667&salt=1608543843056&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['模块', '组件', '模组'],
            key: 'Module'
          },
          {
            value: ['电子点火器', '点火模块', '点火控制器', '电子焚烧器'],
            key: 'Ignition Module'
          },
          {
            value: ['模组尺寸', '单元板尺寸', '模块尺寸', '单元模组尺寸'],
            key: 'Module size'
          }
        ],
        requestId: '78201cbd-9237-44b3-8307-f19cb16252c5',
        translation: ['模块'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=module'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=module'
        },
        basic: {
          exam_type: ['考研', 'IELTS'],
          'us-phonetic': 'ˈmɑːdʒuːl',
          phonetic: 'ˈmɒdjuːl',
          'uk-phonetic': 'ˈmɒdjuːl',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'modules'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=module&langType=en&sign=A221A28ACBC22ED2A467C2B900CC5F30&salt=1608543843056&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['n. [计] 模块；组件；模数'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=module&langType=en&sign=A221A28ACBC22ED2A467C2B900CC5F30&salt=1608543843056&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=module&langType=en&sign=A221A28ACBC22ED2A467C2B900CC5F30&salt=1608543843056&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'index',
      textExts: [],
      translation: '指数',
      ctime: '2021-07-01T20:48:37+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-01T20:53:37+08:00'
      },
      youdao: {
        returnPhrase: ['index'],
        query: 'index',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E6%8C%87%E6%95%B0&langType=zh-CHS&sign=D144CEEE33A597F35C7C99778FB062DD&salt=1608206953577&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['指数', '索引', '指标', '数据库索引'],
            key: 'Index'
          },
          {
            value: ['酷热指数', '热指数', '传热系数'],
            key: 'heat index'
          },
          {
            value: ['默克索引'],
            key: 'Merck Index'
          }
        ],
        requestId: '8ead1932-8dda-4d65-be25-aece51b3e740',
        translation: ['指数'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=index'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=index'
        },
        basic: {
          exam_type: ['CET4', 'CET6', '考研', 'GMAT', '商务英语'],
          'us-phonetic': 'ˈɪndeks',
          phonetic: 'ˈɪndeks',
          'uk-phonetic': 'ˈɪndeks',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'indexes或indices'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=index&langType=en&sign=BA8ACB2DAADF12646B9C76FF7F703660&salt=1608206953577&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: [
            'n. 指标；指数；索引；指针',
            'vi. 做索引',
            'vt. 指出；编入索引中'
          ],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=index&langType=en&sign=BA8ACB2DAADF12646B9C76FF7F703660&salt=1608206953577&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=index&langType=en&sign=BA8ACB2DAADF12646B9C76FF7F703660&salt=1608206953577&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'materialList',
      textExts: [],
      translation: 'materiallist',
      ctime: '2021-07-01T20:49:04+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-01T20:54:04+08:00'
      },
      youdao: {
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=materiallist&langType=zh-CHS&sign=EF09BE1A8296B9F5EACCC89084F80B03&salt=1618760826176&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['材料单', '材料表'],
            key: 'materiallist'
          }
        ],
        requestId: 'c5b98d5c-8c34-4242-ab9b-51ca5ecd21e2',
        query: 'materiallist',
        translation: ['materiallist'],
        errorCode: '0',
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=materiallist'
        },
        webdict: {
          url: 'http://mobile.youdao.com/dict?le=eng&q=materiallist'
        },
        l: 'en2zh-CHS',
        isWord: false,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=materiallist&langType=en&sign=EF09BE1A8296B9F5EACCC89084F80B03&salt=1618760826176&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: "      alert('add')\n",
      textExts: [],
      translation: "alert('添加')",
      ctime: '2021-07-01T20:49:37+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-01T20:54:37+08:00'
      },
      youdao: {
        tSpeakUrl:
          'https://openapi.youdao.com/ttsapi?q=alert%28%27%E6%B7%BB%E5%8A%A0%27%29&langType=zh-CHS&sign=CD09BDF78D18EB94E458930EFBCA7B9C&salt=1625143777824&voice=4&format=mp3&appKey=3bc15f324114c0f3&ttsVoiceStrict=false',
        web: [
          {
            value: ['添加一新警告'],
            key: 'Add a new Alert'
          }
        ],
        requestId: '7e8e1d58-73b3-4165-8658-7ded887a017d',
        query: "alert('add')",
        translation: ["alert('添加')"],
        errorCode: '0',
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=alert%28%27add%27%29'
        },
        webdict: {
          url: 'http://mobile.youdao.com/dict?le=eng&q=alert%28%27add%27%29'
        },
        l: 'en2zh-CHS',
        isWord: false,
        speakUrl:
          'https://openapi.youdao.com/ttsapi?q=alert%28%27add%27%29&langType=en&sign=7958C598BF1D6AF5146BE2397C7254D1&salt=1625143777824&voice=4&format=mp3&appKey=3bc15f324114c0f3&ttsVoiceStrict=false'
      }
    },
    {
      text: 'error',
      textExts: [],
      translation: '错误',
      ctime: '2021-07-01T20:49:55+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-01T20:54:55+08:00'
      },
      youdao: {
        returnPhrase: ['error'],
        query: 'Error',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E9%94%99%E8%AF%AF&langType=zh-CHS&sign=3E5B983897CD283670B5E7D78F60F1A6&salt=1608282658090&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['错误', '误差', '差错', '出错'],
            key: 'Error'
          },
          {
            value: ['误差函数', '错误函数', '差函数', '或者错误函数'],
            key: 'error function'
          },
          {
            value: ['抽样误差', '取样误差', '采样误差', '均数的抽样误差'],
            key: 'sampling error'
          }
        ],
        requestId: '7325d21a-74ef-4605-8ec8-5813d70e6781',
        translation: ['错误'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=Error'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=Error'
        },
        basic: {
          exam_type: [
            '高中',
            'CET4',
            'CET6',
            '考研',
            'IELTS',
            'SAT',
            '商务英语'
          ],
          'us-phonetic': 'ˈerər',
          phonetic: 'ˈerər',
          'uk-phonetic': 'ˈerər',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'errors'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=Error&langType=en&sign=DDB7D1E8FABD7E522B53D87F05AD8D9F&salt=1608282658090&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['n. 误差；错误；过失'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=Error&langType=en&sign=DDB7D1E8FABD7E522B53D87F05AD8D9F&salt=1608282658090&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=Error&langType=en&sign=DDB7D1E8FABD7E522B53D87F05AD8D9F&salt=1608282658090&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'exports',
      textExts: [],
      translation: '出口',
      ctime: '2021-07-01T20:50:25+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-01T20:55:25+08:00'
      },
      youdao: {
        returnPhrase: ['exports'],
        query: 'exports',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E5%87%BA%E5%8F%A3&langType=zh-CHS&sign=5A1E88A709E4E011D5CAD4893EA47AA9&salt=1609058527010&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['出口国', '出口', '主配置文件', '出口额'],
            key: 'Exports'
          },
          {
            value: ['净出口', '净出口值', '净出口指数'],
            key: 'Net exports'
          },
          {
            value: ['输出额', '出口额'],
            key: 'amount of exports'
          }
        ],
        requestId: '3ca73c27-1476-4e18-8fd0-973bab15de4d',
        translation: ['出口'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=exports'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=exports'
        },
        basic: {
          exam_type: [
            '高中',
            'CET4',
            'CET6',
            '考研',
            'IELTS',
            'GMAT',
            '商务英语'
          ],
          'us-phonetic': "'eksport",
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=exports&langType=en&sign=78DAB1089230029C1529102EB738F87B&salt=1609058527010&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['n. 出口商品（export 的复数）'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=exports&langType=en&sign=78DAB1089230029C1529102EB738F87B&salt=1609058527010&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=exports&langType=en&sign=78DAB1089230029C1529102EB738F87B&salt=1609058527010&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'filter',
      textExts: [],
      translation: '过滤器',
      ctime: '2021-07-01T20:50:47+08:00',
      learn: {
        level: 1,
        learnDate: '2021-07-02T13:49:07+08:00'
      },
      youdao: {
        returnPhrase: ['filter'],
        query: 'filter',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E8%BF%87%E6%BB%A4%E5%99%A8&langType=zh-CHS&sign=012016D0A1880AF7F4B5970E87B76046&salt=1608347096100&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['滤器', '过滤', '滤镜'],
            key: 'filter'
          },
          {
            value: ['有源滤波器', '有源滤波器', '滤波器', '主动式滤波器'],
            key: 'active filter'
          },
          {
            value: ['布隆过滤器', '布鲁姆过滤器', '布隆过滤', 'Bloom滤波器'],
            key: 'Bloom Filter'
          }
        ],
        requestId: '62f84fe9-28df-4e81-8c9d-9a379ba693d3',
        translation: ['过滤器'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=filter'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=filter'
        },
        basic: {
          exam_type: [
            'CET4',
            'CET6',
            '考研',
            'IELTS',
            'TOEFL',
            'GRE',
            'GMAT',
            'SAT'
          ],
          'us-phonetic': 'ˈfɪltər',
          phonetic: 'ˈfɪltər',
          'uk-phonetic': 'ˈfɪltər',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'filters'
              }
            },
            {
              wf: {
                name: '第三人称单数',
                value: 'filters'
              }
            },
            {
              wf: {
                name: '现在分词',
                value: 'filtering'
              }
            },
            {
              wf: {
                name: '过去式',
                value: 'filtered'
              }
            },
            {
              wf: {
                name: '过去分词',
                value: 'filtered'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=filter&langType=en&sign=E7067CBCC64FADE17E7BBFB48187B327&salt=1608347096099&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: [
            'n. 过滤器；滤波器；筛选程序；分流指示灯',
            'v. 过滤；渗透；用过滤法除去；慢慢传开；缓行；仅可左转行驶',
            'n. （Filter）（德）菲尔特（人名）'
          ],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=filter&langType=en&sign=E7067CBCC64FADE17E7BBFB48187B327&salt=1608347096099&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=filter&langType=en&sign=F6D15D2F0B306DA2A6014C0E5CB423E6&salt=1608347096100&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'software',
      textExts: [],
      translation: '软件',
      ctime: '2021-07-01T20:52:24+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-01T20:57:24+08:00'
      },
      youdao: {
        returnPhrase: ['software'],
        query: 'Software',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E8%BD%AF%E4%BB%B6&langType=zh-CHS&sign=CBDC8433DAD32628F2547196D85019FC&salt=1608195574044&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['软件', '软件', '软体', '软设备'],
            key: 'Software'
          },
          {
            value: ['自由软件', '自由软体', '免费软件', '自在软件'],
            key: 'free software'
          },
          {
            value: ['软件框架', '软体框架', '软件架构'],
            key: 'software framework'
          }
        ],
        requestId: '7d3668fc-7010-4bfd-a90a-91ce334c30f0',
        translation: ['软件'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=Software'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=Software'
        },
        basic: {
          exam_type: ['高中', 'CET4', 'CET6', '考研', 'IELTS', '商务英语'],
          'us-phonetic': 'ˈsɔːftwer',
          phonetic: 'ˈsɒftweər',
          'uk-phonetic': 'ˈsɒftweər',
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=Software&langType=en&sign=152895368F49F88613C6820243DF5C5C&salt=1608195574044&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['n. 软件'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=Software&langType=en&sign=152895368F49F88613C6820243DF5C5C&salt=1608195574044&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=Software&langType=en&sign=152895368F49F88613C6820243DF5C5C&salt=1608195574044&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    },
    {
      text: 'pronuciation',
      textExts: [],
      translation: 'pronuciation',
      ctime: '2021-07-02T17:26:05+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-02T17:26:35+08:00'
      },
      youdao: {
        tSpeakUrl:
          'https://openapi.youdao.com/ttsapi?q=pronuciation&langType=zh-CHS&sign=2C9A956BFC3E7AE49402F62DB18CEB37&salt=1625217965861&voice=4&format=mp3&appKey=3bc15f324114c0f3&ttsVoiceStrict=false',
        web: [
          {
            value: ['发音'],
            key: 'pronuciation'
          },
          {
            value: ['标准音'],
            key: 'Received Pronuciation'
          },
          {
            value: ['语音语调'],
            key: 'Pronuciation & Intonation'
          }
        ],
        requestId: 'c3a2c7b1-0d72-4b13-8598-7c74010004ab',
        query: 'pronuciation',
        translation: ['pronuciation'],
        errorCode: '0',
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=pronuciation'
        },
        webdict: {
          url: 'http://mobile.youdao.com/dict?le=eng&q=pronuciation'
        },
        l: 'en2zh-CHS',
        isWord: false,
        speakUrl:
          'https://openapi.youdao.com/ttsapi?q=pronuciation&langType=en&sign=2C9A956BFC3E7AE49402F62DB18CEB37&salt=1625217965861&voice=4&format=mp3&appKey=3bc15f324114c0f3&ttsVoiceStrict=false'
      }
    },
    {
      text: 'pronunciation',
      textExts: [],
      translation: '发音',
      ctime: '2021-07-02T17:26:26+08:00',
      learn: {
        level: 0,
        learnDate: '2021-07-02T17:26:56+08:00'
      },
      youdao: {
        returnPhrase: ['pronunciation'],
        query: 'Pronunciation',
        errorCode: '0',
        l: 'en2zh-CHS',
        tSpeakUrl:
          'http://openapi.youdao.com/ttsapi?q=%E5%8F%91%E9%9F%B3&langType=zh-CHS&sign=C0A5F7EFC091F8D4019E808DECF357DA&salt=1608272055893&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
        web: [
          {
            value: ['读音', '发音', '语音', '发音法'],
            key: 'pronunciation'
          },
          {
            value: ['练习语音', '练习发音', '训练发音'],
            key: 'practice pronunciation'
          },
          {
            value: ['语音指导', '翉'],
            key: 'Pronunciation Guide'
          }
        ],
        requestId: 'db8f7b1d-1991-475c-9e40-fa2c825fd8e1',
        translation: ['发音'],
        dict: {
          url: 'yddict://m.youdao.com/dict?le=eng&q=Pronunciation'
        },
        webdict: {
          url: 'http://m.youdao.com/dict?le=eng&q=Pronunciation'
        },
        basic: {
          exam_type: ['初中', '高中', 'CET4', 'CET6', '考研', 'IELTS'],
          'us-phonetic': 'prəˌnʌnsiˈeɪʃn',
          phonetic: 'prəˌnʌnsiˈeɪʃn',
          'uk-phonetic': 'prəˌnʌnsiˈeɪʃn',
          wfs: [
            {
              wf: {
                name: '复数',
                value: 'pronunciations'
              }
            }
          ],
          'uk-speech':
            'http://openapi.youdao.com/ttsapi?q=Pronunciation&langType=en&sign=616967BB247F65DA9027DBAFCB408DD6&salt=1608272055893&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
          explains: ['n. 发音；读法'],
          'us-speech':
            'http://openapi.youdao.com/ttsapi?q=Pronunciation&langType=en&sign=616967BB247F65DA9027DBAFCB408DD6&salt=1608272055893&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
        },
        isWord: true,
        speakUrl:
          'http://openapi.youdao.com/ttsapi?q=Pronunciation&langType=en&sign=616967BB247F65DA9027DBAFCB408DD6&salt=1608272055893&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
      }
    }
  ],
  _id: 'word',
  _rev: '65-2e136a7867231c802893c8af9e420383'
}

export default class App extends React.Component<any, HomeState> {
  private uploadInput: React.RefObject<HTMLInputElement>
  constructor(props: any) {
    super(props)
    this.uploadInput = React.createRef()
  }

  state = {
    total: 0,
    allWordsNumber: 0,
    doneTotal: 0,
    list: [],
    allWords: [],
    wordType: 'list',
    showExport: false,
    showImport: false,
    action: {
      code: '',
      type: '',
      payload: {},
      optional: []
    } as UtoolsAction
  } as HomeState

  componentDidMount() {
    utools.onPluginEnter((action) => {
      if (action.code === 'add_vocabulary') {
        window.services.wordModel.addVocabulary().then((word) => {
          console.log('then', word)
          this.updateWordsListToState()
        })
      } else {
        this.updateWordsListToState()
      }
    })

    /* mock */
    // this.updateWordsListToState();
  }

  updateWordsListToState = () => {
    const {
      allWords,
      needLearnWords: list,
      doneList
    } = window.services.wordModel.getAllAndNeedList()
    console.log('updateWordsListToState', list, allWords)
    const total = list?.length
    const allWordsNumber = allWords?.length
    this.setState({
      total,
      allWords,
      list,
      // list: allWords,
      allWordsNumber,
      doneTotal: doneList.length
    })

    /* mock */
    // const list = mock.list;
    // const total = list?.length
    // this.setState({
    //   total,
    //   // @ts-ignore
    //   list
    // })
  }
  switchWordType = (type: 'list' | 'card' | 'notebook') => {
    if (this.state.wordType === type) return
    this.updateWordsListToState()
    this.setState({
      wordType: type
    })
  }

  handleDownloadTXT = () => {
    const content = this.state.allWords.reduce((total, cur) => {
      return (total += `${cur.text}\r\n`)
    }, '')
    var element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    )
    element.setAttribute('download', 'word.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  handleDownloadJson = () => {
    const data = JSON.stringify({list: this.state.allWords})
    const blob = new Blob([data], { type: 'text/json' })
    const e = document.createEvent('MouseEvents')
    const a = document.createElement('a')
    a.download = 'word.json'
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
    a.dispatchEvent(e)
  }

  loadFile = (e) => {
    e.stopPropagation()
    this.uploadInput.current?.click()
  }

  /**
   * @description 把json文件导入到db中
   * @param {*} e
   */
  handleFileChange = async (e: any) => {
    const file: File = e.target.files[0]
    try {
      const fileResult = await read_file(file)
      const data = JSON.parse(fileResult)
      if (data.list && data.list[0]?.text && data.list[0]?.youdao) {
        window.services.wordModel.importWordList(data.list)
        this.updateWordsListToState()
      } else {
        alert('导入失败，请检查数据格式')
      }
    } catch (error) {
      console.log('3333', error);
      alert('导入失败，请检查数据格式')
    }
  }

  handleClickImport = () => {
    this.setState({ showImport: true })
  }

  render() {
    const { wordType } = this.state
    return (
      <ErrorBoundary>
        <div className="home">
          <div className="home_header"></div>
          <div className="home_body">
            {!this.state.list.length && this.state.wordType !== 'card' && <div className="no_words_tips">暂无需要复习的单词</div>}
            {wordType === 'list' && (
              <>
                <WordList
                  list={this.state.list}
                  total={this.state.total}
                  updateList={this.updateWordsListToState}
                />
              </>
            )}
            {wordType === 'card' && (
              <WordCard
                allWords={this.state.allWords}
                list={this.state.list}
                total={this.state.total}
                updateList={this.updateWordsListToState}
              />
            )}
            {wordType === 'notebook' && (
              <NoteBook allWords={this.state.allWords}></NoteBook>
            )}
          </div>
          {this.state.showExport && (
            <div className="export-confirm-modal">
              <div
                className="close"
                onClick={() => {
                  this.setState({ showExport: false })
                }}
              >
                X
              </div>
              <div className="export-group">
                <div className="export-item" onClick={this.handleDownloadTXT}>
                  导出txt
                </div>
                <div className="export-item" onClick={this.handleDownloadJson}>
                  导出Json
                </div>
              </div>
            </div>
          )}
          {this.state.showImport && (
            <div className="export-confirm-modal">
              <div
                className="close"
                onClick={() => {
                  this.setState({ showImport: false })
                }}
              >
                X
              </div>
              {/* <div className="export-group">
                <div className="export-item" onClick={this.loadFile}>
                  导入txt
                </div>
                <div className="export-item" onClick={this.loadFile}>
                  导入Json
                </div>
              </div> */}
            </div>
          )}
          <input
            ref={this.uploadInput}
            accept=".json"
            type="file"
            className="local-file-input"
            onChange={this.handleFileChange}
          />
          <div className="home_footer">
            <div>
              <span>单词总数: {this.state.allWordsNumber}</span>
              <span>待复习: {this.state.total}</span>
              <span>已记完: {this.state.doneTotal}</span>
            </div>
            <div>
              {/* <div onClick={this.handleDownload}>导出</div> */}
              <Tooltip
                overlay="导入"
                overlayStyle={{ transform: 'scale(.8)' }}
                placement="top"
              >
                <i onClick={this.loadFile} className="iconfont icon-import" />
              </Tooltip>
              <Tooltip
                overlay="导出"
                overlayStyle={{ transform: 'scale(.8)' }}
                placement="top"
              >
                <i
                  onClick={() => {
                    this.state.allWordsNumber && this.setState({ showExport: true })
                  }}
                  className={`iconfont icon-export ${!this.state.allWordsNumber ? 'active' : ''}`}
                />
              </Tooltip>
              {/* <Tooltip
                overlay="单词本"
                overlayStyle={{ transform: 'scale(.8)' }}
                placement="top"
              >
                <i
                  onClick={() => this.switchWordType('notebook')}
                  className={`iconfont icon-notebook-1 ${
                    wordType === 'notebook' ? 'active' : ''
                  }`}                  
                />
              </Tooltip> */}
              <Tooltip
                overlay="列表模式"
                overlayStyle={{ transform: 'scale(.8)' }}
                placement="top"
              >
                <i
                  onClick={() => this.switchWordType('list')}
                  className={`iconfont icon-list ${
                    wordType === 'list' ? 'active' : ''
                  }`}
                />
              </Tooltip>
              <Tooltip
                overlay="听写模式"
                overlayStyle={{ transform: 'scale(.8)' }}
                placement="top"
              >
                <i
                  onClick={() => {this.state.allWordsNumber && this.switchWordType('card')}}
                  className={`iconfont icon-card ${
                    (wordType === 'card' || !this.state.allWordsNumber) ? 'active' : ''
                  }`}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}
