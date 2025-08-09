import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from '../style/global.style';
import AddBarcodeModal from '../components/AddBarcodeModal';
import { getHistory, saveHistory } from '../storage/historyStorage';
import HistoryList from '../components/historyList';
import MainButtons from '../components/MainButtons'
import Header from '../components/Header';

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
    setHistory(prev => [
      ...prev,
      {
        code,
        name: description,
        bgColor: '#ffeaa7',
        MaterialIconsColor: '#fdcb6e',
        date: new Date().toISOString(),
      },
    ]);

  };
  const handleDelete = (code) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.code !== code);
      saveHistory(updated);
      return updated;
    });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      {/* Action Buttons */}
      <MainButtons setModal={() => setModalVisible(true)} />

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
