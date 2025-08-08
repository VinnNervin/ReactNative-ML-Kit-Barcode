import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

function AddBarcodeModal({ visible, onClose, onSubmit }) {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = () => {
    if (code.trim() && description.trim()) {
      onSubmit(code, description);
      setCode('');
      setAlert('');
      setDescription('');
      onClose();
    } else {
      setAlert('Please fill in both fields.');
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
          {alert ? <Text style={styles.alert}>*{alert}</Text> : null}

          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.cancel]} onPress={handleClose}>
              <Text style={styles.buttonText}>Batal</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.submit]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Simpan</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  buttonText: {
    // color: '#fff',
    fontWeight: 'bold',
  },
  cancel: {
    borderColor: '#828282ff',
    borderWidth: 1,
  },
  submit: {
    backgroundColor: '#794eefff',
    color: '#fff',
  },
  alert: {
    color: 'red',
    textAlign: 'left',
    fontSize: 12,
  },
});

export default AddBarcodeModal;
