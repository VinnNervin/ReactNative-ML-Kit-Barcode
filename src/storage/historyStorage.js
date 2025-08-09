import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const getHistory = () => {
  const saved = storage.getString('history');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const saveHistory = (history) => {
  storage.set('history', JSON.stringify(history));
};


