import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import BarcodeModule from '../native/BarcodeModule';



const BarcodeScannerScreen = () => {
  const handleScanPress = async () => {
  try {
    const result = await BarcodeModule.openScanner();
    Alert.alert('Hasil Scan', result || 'Tidak ada hasil');
  } catch (error) {
    Alert.alert('Gagal Scan Terjadi kesalahan');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>
      <TouchableOpacity style={styles.button} onPress={handleScanPress}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
