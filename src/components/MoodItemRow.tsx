import React from 'react';
import {View, Text, StyleSheet, Pressable, LayoutAnimation} from 'react-native';
import format from 'date-fns/format';
import {MoodOptionWithTimestamp} from '../Types';
import {theme} from '../Theme';
import {useContext} from 'react';
import {AppContext} from '../App.provider';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useAnimatedGestureHandler, withTiming} from 'react-native-reanimated';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({item}) => {
  const offset = useSharedValue(0);
  const appContext = useContext(AppContext);
  const handleDelete = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [item, appContext]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const removeWithDelay = React.useCallback(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      appContext.handleDeleteMood(item);
    }, 250);
  }, [appContext, item]);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {shouldRemove: boolean}
  >(
    {
      onActive: (event, ctx) => {
        const xVal = Math.floor(event.translationX);
        offset.value = xVal;

        // use Absolute value so the user could swipe either left or right
        if (Math.abs(xVal) <= 100) {
          ctx.shouldRemove = false;
        } else {
          ctx.shouldRemove = true;
        }
      },
      onEnd: (_, ctx) => {
        if (ctx.shouldRemove) {
          // if the item should be removed, animate it off the screen first
          offset.value = withTiming(Math.sign(offset.value) * 2000);

          // then trigger the remove mood item with a small delay
          runOnJS(removeWithDelay)();
        } else {
          // otherwise, animate the item back to the start
          offset.value = withTiming(0);
        }
      },
    },
    [],
  );
  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Reanimated.View style={[styles.moodItem, animatedStyle]}>
          <View style={styles.iconAndDescription}>
            <Text style={styles.moodValue}>{item.mood.emoji}</Text>
            <Text style={styles.moodDescription}>{item.mood.description}</Text>
          </View>
          <Text style={styles.moodDate}>
            {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </Text>
          <Pressable hitSlop={16} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </Reanimated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 25,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyLight,
    fontSize: 10,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  moodDescription: {
    fontSize: 15,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: 'blue',
    fontFamily: theme.fontFamilyLight,
  },
});
