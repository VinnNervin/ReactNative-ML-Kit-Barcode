import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import styles from '../style/BarcodeScannerScreen.styles';
import { getHistory, saveHistory } from '../storage/historyStorage';

const HistoryList = ({ history, onDelete }) => {
  return (
    <View style={[styles.listContainer, { flex: 1 }]}>
      <Text style={styles.listTitle}>Riwayat Barcode</Text>
      <Text style={styles.listSubtitle}>
        Daftar riwayat barcode yang pernah ditambahkan
      </Text>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        data={history}
        keyExtractor={item => item.code + item.date}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View
              style={[
                styles.MaterialIconsBox,
                { backgroundColor: item.bgColor },
              ]}
            >
              <MaterialIcons
                name="history"
                size={24}
                color={item.MaterialIconsColor}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemCode}>{item.code}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={{ fontSize: 10, color: '#aaa' }}>
                {new Date(item.date).toLocaleString()}
              </Text>
            </View>
            <MaterialIcons name="delete" size={24} color="red" onPress={() => onDelete(item.code)} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HistoryList;