import Sound from 'react-native-sound';

/**
 * Memutar file suara dari bundle dengan nama file.
 * Pastikan file berada di res/raw (Android) atau dalam Xcode resources (iOS)
 * @param filename - Nama file suara (misalnya: 'success.mp3')
 */
export const playSound = (filename: string) => {
  const sound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Gagal memuat suara:', error);
      return;
    }
    sound.play(() => sound.release());
  });
};
