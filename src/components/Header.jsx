import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style/global.style';
import MaterialIcons from '@react-native-vector-icons/material-icons';
const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Barcode Scanner</Text>
        <MaterialIcons name="home" size={24} color="#fff" />
      </View>
      <Text style={styles.headerSubtitle}>
        Kelola dan scan barcode dengan mudah
      </Text>
    </View>
  );
};

export default Header;
