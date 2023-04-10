import React from 'react';
import {Button} from 'react-native-paper';

export const ButtonComp = ({
  mode,
  textColor,
  disabled,
  onPress,
  text,
  style,
  elevation
}) => {
  return (
    <Button
      mode={mode}
      elevation={elevation}
      textColor={textColor}
      disabled={disabled}
      style={style}
      onPress={onPress}>
      {text}
    </Button>
  );
};
