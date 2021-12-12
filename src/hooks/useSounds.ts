import clickMp3 from 'src/assets/sounds/click.mp3'
import keydown from 'src/assets/sounds/keydown.mp3'
import beepMp3 from 'src/assets/sounds/beep.mp3'
import hitMp3 from 'src/assets/sounds/hit.mp3'

function useKeySound() {
  const keyAudio = new Audio(clickMp3)
  const beppAudio = new Audio(beepMp3)
  const hitAudio = new Audio(hitMp3)
  const playKeySound = () => {
    keyAudio.currentTime = 0;
    keyAudio.play()
  }
  const playBeepSound = () => {
    beppAudio.currentTime = 0;
    beppAudio.play()
  }
  const playSuccessSound = () => {
    hitAudio.currentTime = 0;
    hitAudio.play()
  }

  return {
    playKeySound,
    playBeepSound,
    playSuccessSound
  }
}

export const useKeySoudIns = useKeySound()