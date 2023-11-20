import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements'
import theme from '../theme';

const RepositoryListHeader = ({ setSearch, search, setOrderBy, setOrderDirection }) => {
  const [orderValue, setOrderValue] = useState();

  const updateSearch = (keyword) => {
    setSearch(keyword);
  }

  const order = (value) => {
    setOrderValue(value);

    switch (value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColors.bgDefault,
    },
    picker: {
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5,
    },
    inputStyle: {
      backgroundColor: theme.backgroundColors.bgWhite,
      marginLeft: 10,
      marginRight: 10,
    }
  });

  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search" onChangeText={updateSearch} value={search}
        lightTheme inputContainerStyle={styles.inputStyle} containerStyle={styles.container} />
      <Picker onValueChange={order} selectedValue={orderValue} style={styles.picker}>
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest repositories' value='lowest' />
      </Picker>
    </View>
  );
}

export default RepositoryListHeader;

// 