const audio = new Audio()
export const isLegal = (val: string): boolean =>
  /^[a-z_A-Z_._(_)_0-9'!,'?\-;[\]\\/]$/.test(val)

export const playWordPronunciation = (text: string) => {
  console.log(`${window.services.constanst.audioBaseUrl}?audio=${text}`)
  audio.src = `${window.services.constanst.audioBaseUrl}?audio=${text}`
  // audio.load = () => {
    setTimeout(() => {
      audio.play();
    }, 50)
    
  // }
}
