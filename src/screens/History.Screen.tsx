import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const History: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>History Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'teal',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
