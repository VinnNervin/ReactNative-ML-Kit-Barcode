import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
import PressButton from './buttons/pressButton';

function AddBarcodeModal({ visible, onClose, onSubmit }) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = () => {
    if (code.trim()) {
      onSubmit(code, description);
      setCode('');
      setAlert('');
      setDescription('');
      onClose();
    } else {
      setAlert('*harap isi kode barcode.');
    }
  };
  const handleClose = () => {
    setCode('');
    setDescription('');
    setAlert('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Tambah Data Barcode</Text>
          <TextInput
            style={styles.input}
            placeholder="Kode Barcode"
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Deskripsi Barcode"
            value={description}
            onChangeText={setDescription}
          />
          {alert ? <Text style={styles.alert}>{alert}</Text> : null}
          <View style={styles.buttonRow}>
            <PressButton
              title="Batal"
              bgColor="#ffffffff"
              bgPressedColor="#ffffffff"
              textColor="#000"
              onPress={handleClose}
              style={{ borderWidth: 2, borderColor: '#858585ff' }}
            />
            <PressButton
              title="Simpan"
              bgColor="#794eefff"
              bgPressedColor="#633dcdff"
              onPress={handleSubmit}
              style={{ borderWidth: 2, borderColor: 'transparent' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingVertical: 10,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  alert: {
    color: 'red',
    textAlign: 'left',
    fontSize: 12,
  },
});

export default AddBarcodeModal;
