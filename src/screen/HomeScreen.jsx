import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import Toast, { toastConfig, showToast } from '../components/CustomToast';
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
        showToast('warning', `Barcode ${code} sudah ada.`);
        return prev;
      }
      showToast('success', `Berhasil menambahkan barcode ${code}.`);
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
            showToast('warning', `Barcode ${result} sudah ada.`);
            return prev;
          }
          showToast('success', `Berhasil scan barcode ${result}.`);
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
      showToast('success', `Berhasil menghapus barcode ${code}.`);
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

      {/* Toast Message */}
      <Toast config={toastConfig} />
      <Button
        title="Show Test Toast"
        onPress={() => showToast('error', 'Berhasil menghapus barcode.')}
      />
    </View>
  );
};

export default HomeScreen;
