import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {MoodPicker} from '../components/MoodPicker';
import {MoodOptionType, MoodOptionWithTimestamp} from '../Types';
import {MoodItemRow} from '../components/MoodItemRow';
const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: React.FC = () => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectedMood = React.useCallback(
    (selectedMood: MoodOptionType) => {
      setMoodList([...moodList, {mood: selectedMood, timestamp: Date.now()}]);
    },
    [moodList, setMoodList],
  );
  console.log(handleSelectedMood);

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={{flex: 1}} />
      <View style={[StyleSheet.absoluteFill, {justifyContent: 'center'}]}>
        <ScrollView style={styles.moodList}>
          <MoodPicker handleSelectedMood={handleSelectedMood} />
          {moodList.map(item => (
            <MoodItemRow key={item.timestamp} item={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  moodList: {},
});
