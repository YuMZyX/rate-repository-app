import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import RepositoryListHeader from './RepositoryListHeader';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.bgDefault,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach, 
  setSearch, search, setOrderBy, setOrderDirection }) => {
    
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => 
          <RepositoryItem repository={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<RepositoryListHeader setSearch={setSearch} search={search}
          setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [search, setSearch] = useState('');
  const [searchKeyword] = useDebounce(search, 500);

  const { repositories, fetchMore } = useRepositories({ 
    first: 8,
    orderBy, 
    orderDirection, 
    searchKeyword 
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories}
      onEndReach={onEndReach}
      setSearch={setSearch}
      search={search} 
      setOrderBy={setOrderBy} 
      setOrderDirection={setOrderDirection} 
    />
  )
};

export default RepositoryList;