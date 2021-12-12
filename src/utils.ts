const audio = new Audio()
export const isLegal = (val: string): boolean =>
  /^[a-z_A-Z_._(_)_0-9\s'!,'?\-;[\]\\/]$/.test(val)

export const playWordPronunciation = (text: string) => {
  audio.src = `${window.services.constanst.audioBaseUrl}?audio=${text}`
  audio.load()
  audio.play()
}

export async function read_file(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      resolve('')
    }
    reader.readAsText(file)
  })
}

export function downloadTXTByContent(content: string) {
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

export function downloadJsonByContent(data: string) {
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


export function isMac() {
  return /macintosh|mac os x/i.test(navigator.userAgent); 
}

export function isWindows() {
  return /windows|win32/i.test(navigator.userAgent);
}