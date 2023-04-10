import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export const DropdownComp = ({
  data,
  onselect,
  buttonTextAfterSelection,
  rowTextForSelection,
  dropdownRef,
  defaultBtnText,
  buttonstyle,
  buttonTextStyle,
  search,
  searchPlaceHolder,
  searchPlaceHolderColor,
  rowstyle,
  value
}) => {
  return (
    <SelectDropdown
      data={data}
      search={search}
      onSelect={onselect}
      value={value}
      buttonTextAfterSelection={buttonTextAfterSelection}
      rowTextForSelection={rowTextForSelection}
      ref={dropdownRef}
      rowStyle={rowstyle}
      defaultButtonText={defaultBtnText}
      searchPlaceHolder={searchPlaceHolder}
      searchPlaceHolderColor={searchPlaceHolderColor}
      buttonStyle={buttonstyle}
      buttonTextStyle={buttonTextStyle}
      dropdownIconPosition='right'
    />
  );
};
