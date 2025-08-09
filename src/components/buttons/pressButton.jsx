import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import styles from '../../style/global.style';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const PressButton = ({
  title,
  onPress,
  paddingVertical,
  paddingHorizontal,
  bgColor,
  bgPressedColor,
  icon,
  textColor,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        { backgroundColor: pressed ? bgPressedColor : bgColor },
        style,
      ]}
    >
      {icon && <MaterialIcons name={icon} size={24} color="#fff" />}
      <Text
        style={[
          styles.buttonText,
          {
            paddingVertical: paddingVertical,
            paddingHorizontal: paddingHorizontal,
            color: textColor || '#fff',
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default PressButton;
