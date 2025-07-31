import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BarcodeModule from '../native/BarcodeModule';
import { playSound } from '../utils/soundUtils'; // sesuaikan dengan struktur foldermu

const validBarcodes = ['sku-01', 'sku-1234', 'qu code'];

const BarcodeScannerScreen = () => {
  const [lastResult, setLastResult] = useState('');
  const [status, setStatus] = useState<'valid' | 'invalid' | ''>('');

  const handleScanPress = async () => {
    try {
      const result = await BarcodeModule.openScanner();
      if (!result) {
        setLastResult('Tidak ada hasil');
        setStatus('');
        return;
      }

      setLastResult(result);

      if (validBarcodes.includes(result)) {
        setStatus('valid');
        playSound('success.mp3');
      } else {
        setStatus('invalid');
        playSound('error.mp3');
      }
    } catch (error) {
      setLastResult('Gagal scan');
      setStatus('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>
      <TouchableOpacity style={styles.button} onPress={handleScanPress}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>

      {lastResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Hasil: {lastResult}</Text>
          <Text
            style={[
              styles.statusText,
              { color: status === 'valid' ? 'green' : 'red' },
            ]}
          >
            {status === 'valid'
              ? '✅ Barcode Valid'
              : status === 'invalid'
              ? '❌ Barcode Tidak Dikenal'
              : ''}
          </Text>
        </View>
      ) : null}
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
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
