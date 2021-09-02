const audio = new Audio()
export const isLegal = (val: string): boolean =>
  /^[a-z_A-Z_._(_)_0-9\s'!,'?\-;[\]\\/]$/.test(val)

export const playWordPronunciation = (text: string) => {
  console.log(`${window.services.constanst.audioBaseUrl}?audio=${text}`)
  audio.src = `${window.services.constanst.audioBaseUrl}?audio=${text}`
  setTimeout(() => {
    audio.play()
  }, 50)
}

export async function read_file(file:File):Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      resolve('');
    };
    reader.readAsText(file);
  });
}