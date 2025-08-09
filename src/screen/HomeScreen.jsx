import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from '../style/global.style';
import AddBarcodeModal from '../components/AddBarcodeModal';
import { getHistory, saveHistory } from '../storage/historyStorage';
import HistoryList from '../components/historyList';
import MainButtons from '../components/MainButtons';
import Header from '../components/Header';
import BarcodeModule from '../native/BarcodeModule';

const HomeScreen = () => {
  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Load history dari MMKV saat pertama kali render
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Simpan history ke MMKV setiap kali history berubah
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const handleAddBarcode = (code, description) => {
    setHistory(prev => {
      const isDuplicate = prev.some(item => item.code === code);
      if (isDuplicate) {
        // Bisa tambahkan alert/toast di sini jika ingin
        return prev;
      }
      return [
        ...prev,
        {
          code,
          name: description,
          bgColor: '#ffeaa7',
          MaterialIconsColor: '#fdcb6e',
          date: new Date().toISOString(),
        },
      ];
    });
  };

  const handleScanBarcode = async () => {
    try {
      const result = await BarcodeModule.openScanner();
      if (result) {
        setHistory(prev => {
          const isDuplicate = prev.some(item => item.code === result);
          if (isDuplicate) {
            // Bisa tambahkan alert/toast di sini jika ingin
            return prev;
          }
          return [
            ...prev,
            {
              code: result,
              name: '',
              bgColor: '#ffeaa7',
              MaterialIconsColor: '#fdcb6e',
              date: new Date().toISOString(),
            },
          ];
        });
      }
    } catch (e) {
      console.log('Scan gagal:', e);
    }
  };
  const handleDelete = code => {
    setHistory(prev => {
      const updated = prev.filter(item => item.code !== code);
      saveHistory(updated);
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      {/* Action Buttons */}
      <MainButtons
        setModal={() => setModalVisible(true)}
        onScan={handleScanBarcode}
      />

      {/* History List */}
      <HistoryList history={history} onDelete={handleDelete} />

      {/* Modal Tambah Data */}
      <AddBarcodeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddBarcode}
      />
    </View>
  );
};

export default HomeScreen;
