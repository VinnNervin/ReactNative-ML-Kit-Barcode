import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import styles from '../../style/global.style';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const PressButton = ({
  title,
  onPress,
  bgColor = '#5e54e2',
  bgPressedColor = '#6c5ce7',
  icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        { backgroundColor: pressed ? bgPressedColor : bgColor },
      ]}
    >
      {icon && <MaterialIcons name={icon} size={24} color="#fff" />}
      <Text style={[styles.buttonText]}>{title}</Text>
    </Pressable>
  );
};

export default PressButton;
