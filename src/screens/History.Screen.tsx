import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRow';

export const History: React.FC = () => {
  const appContext = useContext(AppContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={appContext.moodList}
        renderItem={({item}) => <MoodItemRow item={item} />}
        keyExtractor={item => item.timestamp.toString()}
        ListEmptyComponent={() => <Text>No moods yet</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 5,
  },
});
