import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DataTable from 'react-native-datatable-component';

export const TableComp = ({
  data,
  colNames,
  backgroundColor,
  colSettings,
  headerLabelStyle,
  noOfPages,
  sort,
  onRowSelect,
  
}) => {
  return (
    <View style={styles.container}>
      <DataTable
        data={data} //data to be displayed in table (array of obj)
        colNames={colNames} //table headings (array of strings)
        colSettings={colSettings} //settings of the table heading (array of obj)
        backgroundColor={backgroundColor}
        headerLabelStyle={headerLabelStyle}
        onRowSelect={onRowSelect}
        noOfPages={noOfPages}
        doSort={sort}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    width: '100%',
    alignSelf: 'center',
  },
});
