import Sound from 'react-native-sound';

/**
 * @param filename - Nama file suara (misalnya: 'success.mp3')
 */
export const playSound = (filename) => {
  const sound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Gagal memuat suara:', error);
      return;
    }
    sound.play(() => sound.release());
  });
};
