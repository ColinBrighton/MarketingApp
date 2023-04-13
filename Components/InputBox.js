import React from 'react';
import {TextInput} from 'react-native-paper';

export const InputBox = ({
  type,
  placeholder,
  label,
  value,
  right,
  keyboardType,
  multiline,
  onChangeText,
  onBlur,
  disabled,
  secureText,
  mode,
  styles,
  activeOutlineColor,
  placeholderTextColor,
  activeUnderlineColor,
  numberOfLines
}) => {
    
  return (
    <TextInput
      style={styles}
      textContentType={type}
      secureTextEntry={secureText}
      numberOfLines={4}
      mode={mode}
      value={value}
      label={label}
      placeholder={placeholder}
      right={right}
      keyboardType={keyboardType}
      multiline={multiline}
      activeOutlineColor={activeOutlineColor}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      onBlur={onBlur}
      disabled={disabled}
      activeUnderlineColor={activeUnderlineColor}
    />
  );
};
