import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import styles from '../style/BarcodeScannerScreen.styles';
import AddBarcodeModal from '../components/AddBarcodeModal';
import { getHistory, saveHistory } from '../storage/historyStorage';
import HistoryList from '../components/historyList';

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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Barcode Scanner</Text>
          <MaterialIcons name="home" size={24} color="#fff" />
        </View>
        <Text style={styles.headerSubtitle}>
          Kelola dan scan barcode dengan mudah
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Pressable style={[styles.actionButton, styles.buttonPurple]}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.buttonGreen]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Tambah Data</Text>
        </Pressable>
      </View>

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
