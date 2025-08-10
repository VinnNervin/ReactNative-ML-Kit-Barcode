import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const base = ({ text1, tag, color }) => (
  <View style={[styles.base, { borderLeftColor: color }]}>
    <Text style={[styles.tag, { color: color }]}>{tag ?? 'nope'}</Text>
    <Text style={styles.normalText}>{text1}</Text>
  </View>
);
const toastConfig = {
  base: base,
  success: ({ text1 }) => base({ text1, tag: 'Success', color: '#22c55e' }),
  error: ({ text1 }) => base({ text1, tag: 'Error', color: '#ef4444' }),
  warning: ({ text1 }) => base({ text1, tag: 'Warning', color: '#f59e0b' }),
};

export const showToast = (type, text, config = {}) => {
  Toast.show({ type, text1: text, position: 'bottom', ...config });
};

const styles = StyleSheet.create({
  base: {
    width: width - 32,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'column',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tag: { fontSize: 16, fontWeight: '800' },

  normalText: {
    color: '#5d5d5dff',
    fontSize: 14,
  },
});

export { toastConfig };
export default Toast;
