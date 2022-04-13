import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {MoodOptionType} from '../Types';
import {theme} from '../Theme';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const moodOptions: MoodOptionType[] = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];
const ImageSrc = require('./../../assets/butterflies.png');

type MoodPickerProps = {
  handleSelectedMood: (moodOption: MoodOptionType) => void;
};
export const MoodPicker: React.FC<MoodPickerProps> = ({handleSelectedMood}) => {
  //console.log(handleSelectedMood);

  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelecteed] = React.useState<boolean>(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : 0.5,
      transform: [{scale: selectedMood ? withTiming(1) : 0.8}],
    }),
    [selectedMood],
  );
  const handlePress = React.useCallback(() => {
    selectedMood && handleSelectedMood(selectedMood);
    selectedMood && setSelectedMood(undefined);
    selectedMood && setHasSelecteed(true);
  }, [selectedMood, handleSelectedMood]);
  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={ImageSrc} style={styles.image} />
        <Pressable
          android_ripple={{radius: 80}}
          style={styles.button}
          onPress={() => setHasSelecteed(false)}>
          <Text style={styles.buttonText}>Choose another!!</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              android_ripple={{
                color: '#ccc',
                borderless: true,
                radius: 35,
              }}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        android_ripple={{radius: 80}}
        style={[styles.button, buttonStyle]}
        onPress={handlePress}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: theme.fontFamilyLight,
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: theme.fontFamilyLight,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  image: {
    alignSelf: 'center',
  },
});
